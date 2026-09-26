/*
 * Diagnoses why the contact form is not delivering mail.
 *
 *   node scripts/check-resend.mjs
 *
 * Reads .env.local, then walks the three things that have to be true before a
 * single message can leave the server: the API key is real, the sender address
 * is verified, and the recipient is allowed. Each step prints the exact Resend
 * response and the concrete fix, so a failure does not have to be guessed at
 * from a 500 in the browser.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { Resend } from "resend";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const GREEN = "\u001b[32m";
const RED = "\u001b[31m";
const YELLOW = "\u001b[33m";
const DIM = "\u001b[2m";
const BOLD = "\u001b[1m";
const OFF = "\u001b[0m";

const ok = (msg) => console.log(`${GREEN}  ok  ${OFF} ${msg}`);
const bad = (msg) => console.log(`${RED} fail ${OFF} ${msg}`);
const warn = (msg) => console.log(`${YELLOW} warn ${OFF} ${msg}`);
const step = (msg) => console.log(`\n${BOLD}${msg}${OFF}`);
const note = (msg) => console.log(`${DIM}       ${msg}${OFF}`);

function loadEnv() {
  const env = {};
  let text;
  try {
    text = readFileSync(join(root, ".env.local"), "utf8");
  } catch {
    console.error(`${RED}No .env.local found.${OFF} Copy .env.example to .env.local first.`);
    process.exit(1);
  }
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const split = line.indexOf("=");
    if (split === -1) continue;
    env[line.slice(0, split).trim()] = line.slice(split + 1).trim();
  }
  return env;
}

/** Pull the display name and address out of a `Name <addr>` string. */
function parseAddress(value) {
  const match = /<([^>]+)>/.exec(value);
  return (match ? match[1] : value).trim();
}

const env = loadEnv();
const key = env.RESEND_API_KEY ?? "";
const fromRaw = env.FROM_EMAIL ?? "";
const to = env.CONTACT_EMAIL || "techpointservices39@gmail.com";
const from = fromRaw || "Tech Point Services <onboarding@resend.dev>";
const fromAddress = parseAddress(from);

console.log(`${BOLD}Tech Point Services - contact email check${OFF}`);
console.log(`${DIM}reading .env.local${OFF}`);

let fatal = false;

/* ---------- 1. credentials ---------- */
step("1. Credentials");

if (!key) {
  bad("RESEND_API_KEY is not set");
  note("Add it to .env.local: create a key at https://resend.com/api-keys");
  fatal = true;
} else if (/your[_-]/i.test(key)) {
  bad(`RESEND_API_KEY is still the placeholder: ${key}`);
  note("Replace it with the re_... key from https://resend.com/api-keys");
  fatal = true;
} else if (!/^re_[A-Za-z0-9_-]{16,}$/.test(key)) {
  bad(`RESEND_API_KEY does not look like a Resend key: ${key.slice(0, 12)}...`);
  note("Resend keys start with re_ followed by a long opaque token.");
  note("A quoted value or a trailing space in .env.local will break it.");
  fatal = true;
} else {
  ok(`RESEND_API_KEY is present (${key.slice(0, 10)}...)`);
}

step("2. Addresses");
note(`from: ${from}`);
note(`to:   ${to}`);

if (/example\.com|(you|your)@/i.test(fromAddress)) {
  bad(`FROM_EMAIL is still a placeholder: ${fromAddress}`);
  note("Set it to a sender you have verified in Resend (see step 4).");
  fatal = true;
} else {
  ok("FROM_EMAIL is not an obvious placeholder");
}

if (fatal) {
  console.log(
    `\n${RED}Stopping before the network call.${OFF} Fix the above, restart \`npm run dev\`, then run this again.`,
  );
  process.exit(1);
}

const resend = new Resend(key);

/* ---------- 2. key validity ---------- */
step("3. API key check");

const domains = await resend.domains.list();
if (domains.error) {
  bad(`Resend rejected the key: ${domains.error.statusCode} ${domains.error.message}`);
  note("The key is invalid, revoked, or belongs to a different account.");
  note("Generate a new one at https://resend.com/api-keys and restart the dev server.");
  process.exit(1);
}
ok("key accepted by the Resend API");

const list = domains.data ?? [];
if (list.length === 0) {
  warn("no domains on this account");
} else {
  for (const domain of list) {
    const mark = domain.status === "verified" ? `${GREEN}verified${OFF}` : `${YELLOW}${domain.status}${OFF}`;
    console.log(`      ${domain.name}  ${mark}`);
  }
}

/* ---------- 3. the send itself ---------- */
step("4. Send test");

const usesSharedDomain = fromAddress.toLowerCase().endsWith("@resend.dev");

if (usesSharedDomain) {
  warn("sending from the shared onboarding@resend.dev domain");
  note("Resend only lets that address deliver to the inbox that owns this API key.");
  note(`If that inbox is not ${to}, this send will be rejected no matter what.`);
  note("Verify a domain and use it as FROM_EMAIL for real submissions.");
}

const { data, error } = await resend.emails.send({
  from,
  to,
  subject: "Tech Point Services - contact form check",
  text: "This is a test of the contact form delivery path. No action needed.",
});

if (error) {
  bad(`Resend refused the send: ${error.statusCode} ${error.name}`);
  note(error.message);
  console.log("");
  if (error.statusCode === 401) {
    note("Fix: the API key is wrong or revoked. Create a new one at https://resend.com/api-keys");
  } else if (error.statusCode === 403) {
    note("Fix: FROM_EMAIL is not verified for this account, or onboarding@resend.dev is");
    note("     addressing an inbox other than the account owner's.");
    note("     Verify a domain at https://resend.com/domains, add the DNS records, then set");
    note("     FROM_EMAIL=Tech Point Services <hello@yourdomain.com> and restart the dev server.");
  } else if (error.statusCode === 422) {
    note("Fix: Resend rejected a field. Read the message above for which one.");
  } else {
    note("Fix: see the Resend dashboard for the full request log.");
  }
  process.exit(1);
}

ok(`accepted, id ${data?.id ?? "unknown"}`);
console.log(
  `\n${GREEN}${BOLD}Delivery path is working.${OFF} Check ${to} (and spam) for the test message.`,
);
if (usesSharedDomain) {
  console.log(
    `${YELLOW}Note:${OFF} this only proves delivery to the account owner's inbox. Verify a domain before`,
  );
  console.log("relying on the form for real enquiries.");
}
