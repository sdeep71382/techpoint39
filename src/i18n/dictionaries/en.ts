/*
 * English is the source of truth for the shape of every other dictionary.
 *
 * The object is deliberately NOT `as const`: without literal types the
 * inferred type is exactly what a translated file needs to satisfy, and a
 * missing key, an extra key, or a function with the wrong arity becomes a
 * compile error rather than a blank space on the page.
 */
export const en = {
  meta: {
    title: "Tech Point Services | Government Service Assistance",
    description:
      "Tech Point Services helps with PAN, driving licence, passport, voter ID, Aadhaar-related services, certificates, online forms, printout, photocopy, and scanning.",
    ogTitle: "Tech Point Services | Government Service Assistance",
    ogDescription:
      "Choose a service, check which documents you already have, and send a request that is already clear.",
  },

  nav: {
    home: "Tech Point Services home",
    services: "Services",
    process: "How it works",
    whyUs: "Why us",
    questions: "Questions",
    contact: "Contact",
    startRequest: "Start a request",
    call: "Call",
    toggleMenu: "Toggle navigation",
    language: "Language",
    languageLabel: "Change language",
  },

  hero: {
    eyebrow: "Tech Point Services",
    titleLead: "Government service assistance, ",
    titleAccent: "minus the guesswork.",
    lead: "Choose a service, check what to prepare, and reach a real person with a request that is already clear.",
    ctaFind: "Find your service",
    ctaCall: "Talk to support",
    pillars: [
      { title: "Clear", text: "Know the next step" },
      { title: "Prepared", text: "Check documents first" },
      { title: "Supported", text: "Ask before starting" },
    ],
  },

  builder: {
    title: "Build your request",
    subtitle: "A quick preparation check",
    stepService: "1. Select service",
    stepDocs: "2. Check what you have",
    checklist: "Starter document list",
    allReady: "All ready",
    left: (n: number) => (n === 1 ? "1 left" : n + " left"),
    note: "Exact requirements may vary. We confirm them before work begins.",
    cta: "Send prepared request",
    footnote: "No form submission happens on this website. Start by confirming the requirement with us.",
    meterLabel: "Document readiness",
    percent: (n: number) => n + "% ready",
    documents: (n: number) => (n === 1 ? "1 document" : n + " documents"),
  },

  assurance: [
    { title: "Documents handled carefully", text: "Share only what is required for the selected service." },
    { title: "Requirements checked first", text: "Know what to prepare before the application begins." },
    { title: "Human support", text: "Get clear explanations through call or WhatsApp." },
  ],

  directory: {
    kicker: "Service directory",
    title: "Find the right place to start.",
    copy: "Search by service name or narrow the list by category.",
    searchLabel: "Search services",
    searchPlaceholder: "Search PAN, passport, certificate...",
    clearSearch: "Clear search",
    resultCount: (shown: number, total: number) => "Showing " + shown + " of " + total + " services",
    clearFilters: "Clear filters",
    selected: "Selected",
    start: "Start this service",
    review: "Review checklist",
    viewDetails: "View details",
    hideDetails: "Hide details",
    emptyTitle: "No matching service found",
    emptyTerm: (term: string) => 'Nothing matches "' + term + '". Try a broader word, or ask us directly.',
    emptyGeneric: "There are no services in this category yet. Ask us directly instead.",
    reset: "Reset the list",
    askAnother: "Ask about another service",
    categories: {
      all: "All services",
      identity: "Identity",
      certificates: "Certificates",
      applications: "Applications",
      "document-work": "Document work",
    },
  },

  process: {
    kicker: "How it works",
    title: "A useful path, from question to next step.",
    copy: "Each stage exists to remove uncertainty before your request moves forward.",
    steps: [
      { title: "Choose a service", text: "Search the directory or select the service that matches your need." },
      { title: "Prepare documents", text: "Use the checklist to see what you already have ready." },
      { title: "Confirm with us", text: "Send the prepared request on WhatsApp or call for guidance." },
      { title: "Follow the process", text: "Receive practical support through the applicable service steps." },
    ],
  },

  why: {
    kicker: "Why Tech Point",
    title: "Support should feel clear, not complicated.",
    copy: "Our role is practical: help you understand the requirement, prepare the request, and move through the applicable online process with confidence.",
    call: "Call",
    copyEmail: "Copy email",
    copied: "Email copied",
    items: [
      { title: "Safe & secure", text: "Careful handling and only service-relevant document guidance." },
      { title: "Time conscious", text: "Preparation first, so avoidable back-and-forth is reduced." },
      { title: "Professional help", text: "Clear explanations in simple language when you need them." },
      { title: "Process focused", text: "Structured support for forms, uploads, and follow-up steps." },
    ],
  },

  faq: {
    kicker: "Before you begin",
    title: "Common questions, plainly answered.",
    copy: "Still unsure? Call and tell us the service name. We will help you identify the next useful step.",
    openCount: (open: number, total: number) => open + " of " + total + " open",
    expandAll: "Expand all",
    collapseAll: "Collapse all",
    items: [
      {
        q: "Is Tech Point Services an official government website?",
        a: "No. Tech Point Services is an independent assistance provider. Eligibility, fees, processing, and final decisions remain with the relevant department.",
      },
      {
        q: "Can I confirm the documents before starting?",
        a: "Yes. Select a service to view a helpful starter checklist, then contact us to confirm the exact documents for your case.",
      },
      {
        q: "How do I begin a request?",
        a: "Choose your service, mark the documents you already have, and use the WhatsApp button. Your message will include the selected service and your readiness details.",
      },
      {
        q: "What if my service is not listed?",
        a: "Choose Other Online Services and briefly describe what you need. We will confirm whether assistance is available.",
      },
    ],
  },

  contact: {
    kicker: "Ready when you are",
    title: "Start with the service. We will help make the next step clear.",
    callUs: "Call us",
    emailUs: "Email us",
    whatsapp: "Continue on WhatsApp",
    disclaimer:
      "Tech Point Services is an independent assistance provider, not a government department. Department rules govern eligibility, fees, and final approval.",
    formKicker: "Send an enquiry",
    formTitle: "Tell us what you need.",
    formCopy: "We will review your request and respond with the next useful step.",
    fields: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      service: "Service",
      message: "Message",
    },
    required: "required",
    notSureYet: "Not sure yet",
    messagePlaceholder: "Tell us a little about your request",
    send: "Send message",
    sending: "Sending...",
    success: "Thanks. Your message has been sent, and we will get back to you soon.",
    privacy: "We use these details only to reply to your enquiry.",
    errors: {
      required: "Please fill in your name, email, and message.",
      email: "Please enter a valid email address.",
      tooLong: "One of the fields is too long. Please shorten it and try again.",
      notConfigured: "Messaging is temporarily unavailable. Please call or WhatsApp us instead.",
      invalid: "Something went wrong. Please try again.",
    },
  },

  footer: {
    explore: "Explore",
    reachUs: "Reach us",
    whatsappUs: "WhatsApp us",
    disclaimer:
      "Tech Point Services is an independent assistance provider and is not an official government website. Fees, eligibility, processing, and approval are governed by the relevant department.",
    rights: "Independent assistance provider · Not a government website",
  },

  mobileBar: { call: "Call", whatsapp: "WhatsApp" },

  notFound: {
    kicker: "Page not found",
    title: "That page does not exist.",
    copy: "The address may be mistyped, or the page may have moved. Pick a language to carry on.",
    backHome: "Go to the homepage",
    chooseLanguage: "Or continue in another language",
  },

  whatsapp: {
    greeting: (service: string) => "Hello Tech Point Services, I need assistance with " + service + ".",
    have: (documents: string) => "I currently have: " + documents + ".",
    needList: "Please share the required document list.",
  },

  a11y: { required: "required" },
};

export type Dictionary = typeof en;
