import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck, CheckCircle2, ClipboardCheck, FileBadge, FileCheck2, FileText,
  Fingerprint, Headphones, IdCard, MessageCircle, Printer, Search, ShieldCheck,
  Sparkles,
} from "lucide-react";

export const phoneNumber = "9780332509";
export const phoneDisplay = "+91 97803 32509";
export const email = "techpointservices39@gmail.com";

export type Category = "All services" | "Identity" | "Certificates" | "Applications" | "Document work";

export type Service = {
  id: string;
  title: string;
  /** Punjabi (Gurmukhi). Rendered with lang="pa" and a Gurmukhi typeface. */
  titlePa: string;
  /** Hindi (Devanagari). Rendered with lang="hi" and a Devanagari typeface. */
  titleHi: string;
  category: Exclude<Category, "All services">;
  description: string;
  icon: LucideIcon;
  accent: string;
  documents: string[];
  /** Rough time and effort, shown as guidance rather than a promise. */
  turnaround: string;
};

export const categories: Category[] = ["All services", "Identity", "Certificates", "Applications", "Document work"];

export const services: Service[] = [
  {
    id: "pan-card",
    title: "PAN Card",
    titlePa: "ਨਵਾਂ ਅਤੇ ਸੁਧਾਰ",
    titleHi: "नया और सुधार",
    category: "Identity",
    description: "Support for new applications, corrections, and document preparation.",
    icon: IdCard,
    accent: "blue",
    documents: ["Aadhaar card", "Mobile number", "Recent photo", "Signature"],
    turnaround: "Usually same day",
  },
  {
    id: "driving-licence",
    title: "Driving Licence",
    titlePa: "ਨਵਾਂ ਅਤੇ ਨਵੀਨੀਕਰਨ",
    titleHi: "नया और नवीनीकरण",
    category: "Identity",
    description: "Guidance for new licence applications and renewal requests.",
    icon: BadgeCheck,
    accent: "cyan",
    documents: ["Identity proof", "Address proof", "Recent photo", "Old licence for renewal"],
    turnaround: "Usually 2 to 3 days",
  },
  {
    id: "passport",
    title: "Passport",
    titlePa: "ਨਵਾਂ ਅਤੇ ਨਵੀਨੀਕਰਨ",
    titleHi: "नया और नवीनीकरण",
    category: "Identity",
    description: "Application, appointment, and renewal assistance with clear next steps.",
    icon: FileBadge,
    accent: "navy",
    documents: ["Identity proof", "Address proof", "Date of birth proof", "Old passport for renewal"],
    turnaround: "Usually 3 to 5 days",
  },
  {
    id: "voter-id",
    title: "Voter ID Card",
    titlePa: "ਵੋਟਰ ਆਈ.ਡੀ. ਸੇਵਾ",
    titleHi: "मतदाता पहचान सेवा",
    category: "Identity",
    description: "Help with registration, corrections, and online voter services.",
    icon: ClipboardCheck,
    accent: "green",
    documents: ["Age proof", "Address proof", "Recent photo", "Mobile number"],
    turnaround: "Usually same day",
  },
  {
    id: "aadhaar",
    title: "Aadhaar-related Services",
    titlePa: "ਆਧਾਰ ਸੇਵਾਵਾਂ",
    titleHi: "आधार सेवाएं",
    category: "Identity",
    description: "Assistance for supported Aadhaar-linked online service requirements.",
    icon: Fingerprint,
    accent: "yellow",
    documents: ["Aadhaar number", "Linked mobile number", "Supporting proof", "Service details"],
    turnaround: "Usually same day",
  },
  {
    id: "birth-death",
    title: "Birth & Death Certificate",
    titlePa: "ਜਨਮ ਅਤੇ ਮੌਤ ਸਰਟੀਫਿਕੇਟ",
    titleHi: "जन्म और मृत्यु प्रमाणपत्र",
    category: "Certificates",
    description: "Application guidance for certificate and record requests.",
    icon: FileCheck2,
    accent: "violet",
    documents: ["Applicant identity proof", "Event details", "Supporting record", "Mobile number"],
    turnaround: "Usually 3 to 7 days",
  },
  {
    id: "income-caste-residence",
    title: "Income, Caste & Residence",
    titlePa: "ਆਮਦਨ, ਜਾਤੀ ਅਤੇ ਨਿਵਾਸ",
    titleHi: "आय, जाति और निवास",
    category: "Certificates",
    description: "Form, upload, and tracking guidance for common certificates.",
    icon: FileText,
    accent: "orange",
    documents: ["Identity proof", "Residence proof", "Income details", "Category proof if applicable"],
    turnaround: "Usually 2 to 4 days",
  },
  {
    id: "government-forms",
    title: "Online Government Forms",
    titlePa: "ਆਨਲਾਈਨ ਸਰਕਾਰੀ ਫਾਰਮ",
    titleHi: "ऑनलाइन सरकारी फॉर्म",
    category: "Applications",
    description: "Assistance with online forms, uploads, and application submissions.",
    icon: FileText,
    accent: "blue",
    documents: ["Service or form name", "Identity proof", "Required documents", "Mobile number"],
    turnaround: "Usually same day",
  },
  {
    id: "print-scan",
    title: "Printout, Photocopy & Scanning",
    titlePa: "ਪ੍ਰਿੰਟ, ਕਾਪੀ ਅਤੇ ਸਕੈਨ",
    titleHi: "प्रिंट, कॉपी और स्कैन",
    category: "Document work",
    description: "Document printouts, copies, and clean digital scans.",
    icon: Printer,
    accent: "navy",
    documents: ["Document or file", "Page count", "Paper size", "Colour preference"],
    turnaround: "While you wait",
  },
  {
    id: "other-services",
    title: "Other Online Services",
    titlePa: "ਹੋਰ ਆਨਲਾਈਨ ਸੇਵਾਵਾਂ",
    titleHi: "अन्य ऑनलाइन सेवाएं",
    category: "Applications",
    description: "Tell us what you need and we will confirm whether we can assist.",
    icon: Sparkles,
    accent: "red",
    documents: ["Service details", "Identity proof", "Available documents", "Mobile number"],
    turnaround: "Depends on the service",
  },
];

export const assurances = [
  { icon: ShieldCheck, title: "Documents handled carefully", text: "Share only what is required for the selected service." },
  { icon: CheckCircle2, title: "Requirements checked first", text: "Know what to prepare before the application begins." },
  { icon: Headphones, title: "Human support", text: "Get clear explanations through call or WhatsApp." },
];

export const steps = [
  { number: "01", title: "Choose a service", text: "Search the directory or select the service that matches your need.", icon: Search },
  { number: "02", title: "Prepare documents", text: "Use the checklist to see what you already have ready.", icon: ClipboardCheck },
  { number: "03", title: "Confirm with us", text: "Send the prepared request on WhatsApp or call for guidance.", icon: MessageCircle },
  { number: "04", title: "Follow the process", text: "Receive practical support through the applicable service steps.", icon: CheckCircle2 },
];

export const faqs = [
  { question: "Is Tech Point Services an official government website?", answer: "No. Tech Point Services is an independent assistance provider. Eligibility, fees, processing, and final decisions remain with the relevant department." },
  { question: "Can I confirm the documents before starting?", answer: "Yes. Select a service to view a helpful starter checklist, then contact us to confirm the exact documents for your case." },
  { question: "How do I begin a request?", answer: "Choose your service, mark the documents you already have, and use the WhatsApp button. Your message will include the selected service and your readiness details." },
  { question: "What if my service is not listed?", answer: "Choose Other Online Services and briefly describe what you need. We will confirm whether assistance is available." },
];
