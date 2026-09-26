import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck, FileBadge, FileCheck2, FileText,
  Fingerprint, IdCard, ClipboardCheck, Printer, Sparkles,
} from "lucide-react";
import type { Locale } from "@/i18n/config";

export const categoryKeys = ["identity", "certificates", "applications", "document-work"] as const;
export type CategoryKey = (typeof categoryKeys)[number];

/** "All services" is a filter control, not a real category. */
export const filterKeys = ["all", ...categoryKeys] as const;
export type FilterKey = (typeof filterKeys)[number];

type Localized = Record<Locale, string>;

export type Service = {
  id: string;
  category: CategoryKey;
  icon: LucideIcon;
  accent: string;
  name: Localized;
  description: Localized;
  /** Rough effort guidance, not a promise. */
  turnaround: Localized;
  documents: Record<Locale, string[]>;
};

export const services: Service[] = [
  {
    id: "pan-card",
    category: "identity",
    icon: IdCard,
    accent: "blue",
    name: { en: "PAN Card", pa: "ਪੈਨ ਕਾਰਡ", hi: "पैन कार्ड" },
    description: {
      en: "Support for new applications, corrections, and document preparation.",
      pa: "ਨਵੇਂ ਅਰਜ਼ੀਆਂ, ਸੁਧਾਰ ਅਤੇ ਦਸਤਾਵੇਜ਼ ਤਿਆਰੀ ਲਈ ਮਦਦ।",
      hi: "नए आवेदन, सुधार और दस्तावेज़ तैयार करने में सहायता।",
    },
    turnaround: {
      en: "Usually same day",
      pa: "ਆਮ ਤੌਰ 'ਤੇ ਉਸੇ ਦਿਨ",
      hi: "आमतौर पर उसी दिन",
    },
    documents: {
      en: ["Aadhaar card", "Mobile number", "Recent photo", "Signature"],
      pa: ["ਆਧਾਰ ਕਾਰਡ", "ਮੋਬਾਈਲ ਨੰਬਰ", "ਹਾਲੀਆ ਫ਼ੋਟੋ", "ਦਸਤਖ਼ਤ"],
      hi: ["आधार कार्ड", "मोबाइल नंबर", "हाल का फोटो", "हस्ताक्षर"],
    },
  },
  {
    id: "driving-licence",
    category: "identity",
    icon: BadgeCheck,
    accent: "cyan",
    name: { en: "Driving Licence", pa: "ਡਰਾਈਵਿੰਗ ਲਾਇਸੰਸ", hi: "ड्राइविंग लाइसेंस" },
    description: {
      en: "Guidance for new licence applications and renewal requests.",
      pa: "ਨਵੇਂ ਲਾਇਸੰਸ ਅਤੇ ਨਵੀਨੀਕਰਨ ਬੇਨਤੀਆਂ ਲਈ ਮਾਰਗਦਰਸ਼ਨ।",
      hi: "नए लाइसेंस और नवीनीकरण अनुरोधों के लिए मार्गदर्शन।",
    },
    turnaround: {
      en: "Usually 2 to 3 days",
      pa: "ਆਮ ਤੌਰ 'ਤੇ 2 ਤੋਂ 3 ਦਿਨ",
      hi: "आमतौर पर 2 से 3 दिन",
    },
    documents: {
      en: ["Identity proof", "Address proof", "Recent photo", "Old licence for renewal"],
      pa: ["ਪਛਾਣ ਪੱਖ", "ਪਤੇ ਦਾ ਪੱਖ", "ਹਾਲੀਆ ਫ਼ੋਟੋ", "ਨਵੀਨੀਕਰਨ ਲਈ ਪੁਰਾਣਾ ਲਾਇਸੰਸ"],
      hi: ["पहचान पत्र", "पता प्रमाण", "हाल का फोटो", "नवीनीकरण हेतु पुराना लाइसेंस"],
    },
  },
  {
    id: "passport",
    category: "identity",
    icon: FileBadge,
    accent: "navy",
    name: { en: "Passport", pa: "ਪਾਸਪੋਰਟ", hi: "पासपोर्ट" },
    description: {
      en: "Application, appointment, and renewal assistance with clear next steps.",
      pa: "ਅਰਜ਼ੀ, ਮੁਲਾਕਾਤ ਅਤੇ ਨਵੀਨੀਕਰਨ ਵਿੱਚ ਸਾਫ਼ ਅਗਲੇ ਕਦਮਾਂ ਨਾਲ ਮਦਦ।",
      hi: "आवेदन, अपॉइंटमेंट और नवीनीकरण में स्पष्ट अगले कदमों के साथ सहायता।",
    },
    turnaround: {
      en: "Usually 3 to 5 days",
      pa: "ਆਮ ਤੌਰ 'ਤੇ 3 ਤੋਂ 5 ਦਿਨ",
      hi: "आमतौर पर 3 से 5 दिन",
    },
    documents: {
      en: ["Identity proof", "Address proof", "Date of birth proof", "Old passport for renewal"],
      pa: ["ਪਛਾਣ ਪੱਖ", "ਪਤੇ ਦਾ ਪੱਖ", "ਜਨਮ ਤਾਰੀਖ ਦਾ ਪੱਖ", "ਨਵੀਨੀਕਰਨ ਲਈ ਪੁਰਾਣਾ ਪਾਸਪੋਰਟ"],
      hi: ["पहचान पत्र", "पता प्रमाण", "जन्म तिथि प्रमाण", "नवीनीकरण हेतु पुराना पासपोर्ट"],
    },
  },
  {
    id: "voter-id",
    category: "identity",
    icon: ClipboardCheck,
    accent: "green",
    name: { en: "Voter ID Card", pa: "ਵੋਟਰ ਆਈਡੀ ਕਾਰਡ", hi: "वोटर आईडी कार्ड" },
    description: {
      en: "Help with registration, corrections, and online voter services.",
      pa: "ਰਜਿਸਟ੍ਰੇਸ਼ਨ, ਸੁਧਾਰ ਅਤੇ ਆਨਲਾਈਨ ਵੋਟਰ ਸੇਵਾਵਾਂ ਵਿੱਚ ਮਦਦ।",
      hi: "पंजीकरण, सुधार और ऑनलाइन मतदाता सेवाओं में सहायता।",
    },
    turnaround: {
      en: "Usually same day",
      pa: "ਆਮ ਤੌਰ 'ਤੇ ਉਸੇ ਦਿਨ",
      hi: "आमतौर पर उसी दिन",
    },
    documents: {
      en: ["Age proof", "Address proof", "Recent photo", "Mobile number"],
      pa: ["ਉਮਰ ਦਾ ਪੱਖ", "ਪਤੇ ਦਾ ਪੱਖ", "ਹਾਲੀਆ ਫ਼ੋਟੋ", "ਮੋਬਾਈਲ ਨੰਬਰ"],
      hi: ["आयु प्रमाण", "पता प्रमाण", "हाल का फोटो", "मोबाइल नंबर"],
    },
  },
  {
    id: "aadhaar",
    category: "identity",
    icon: Fingerprint,
    accent: "yellow",
    name: { en: "Aadhaar-related Services", pa: "ਆਧਾਰ ਸੰਬੰਧੀ ਸੇਵਾਵਾਂ", hi: "आधार संबंधी सेवाएं" },
    description: {
      en: "Assistance for supported Aadhaar-linked online service requirements.",
      pa: "ਆਧਾਰ ਨਾਲ ਜੁੜੀਆਂ ਸਹਾਇਕ ਆਨਲਾਈਨ ਸੇਵਾਵਾਂ ਲਈ ਮਦਦ।",
      hi: "आधार से जुड़ी समर्थित ऑनलाइन सेवाओं की सहायता।",
    },
    turnaround: {
      en: "Usually same day",
      pa: "ਆਮ ਤੌਰ 'ਤੇ ਉਸੇ ਦਿਨ",
      hi: "आमतौर पर उसी दिन",
    },
    documents: {
      en: ["Aadhaar number", "Linked mobile number", "Supporting proof", "Service details"],
      pa: ["ਆਧਾਰ ਨੰਬਰ", "ਜੁੜਿਆ ਮੋਬਾਈਲ ਨੰਬਰ", "ਸਹਾਇਕ ਪੱਖ", "ਸੇਵਾ ਵੇਰਵੇ"],
      hi: ["आधार नंबर", "लिंक मोबाइल नंबर", "सहायक प्रमाण", "सेवा विवरण"],
    },
  },
  {
    id: "birth-death",
    category: "certificates",
    icon: FileCheck2,
    accent: "violet",
    name: { en: "Birth & Death Certificate", pa: "ਜਨਮ ਅਤੇ ਮੌਤ ਸਰਟੀਫਿਕੇਟ", hi: "जन्म और मृत्यु प्रमाणपत्र" },
    description: {
      en: "Application guidance for certificate and record requests.",
      pa: "ਸਰਟੀਫਿਕੇਟ ਅਤੇ ਰਿਕਾਰਡ ਬੇਨਤੀਆਂ ਲਈ ਅਰਜ਼ੀ ਮਾਰਗਦਰਸ਼ਨ।",
      hi: "प्रमाणपत्र और रिकॉर्ड अनुरोधों के लिए आवेदन मार्गदर्शन।",
    },
    turnaround: {
      en: "Usually 3 to 7 days",
      pa: "ਆਮ ਤੌਰ 'ਤੇ 3 ਤੋਂ 7 ਦਿਨ",
      hi: "आमतौर पर 3 से 7 दिन",
    },
    documents: {
      en: ["Applicant identity proof", "Event details", "Supporting record", "Mobile number"],
      pa: ["ਅਰਜ਼ੀਦਾਰ ਦਾ ਪਛਾਣ ਪੱਖ", "ਘਟਨਾ ਵੇਰਵੇ", "ਸਹਾਇਕ ਰਿਕਾਰਡ", "ਮੋਬਾਈਲ ਨੰਬਰ"],
      hi: ["आवेदक का पहचान पत्र", "घटना विवरण", "सहायक रिकॉर्ड", "मोबाइल नंबर"],
    },
  },
  {
    id: "income-caste-residence",
    category: "certificates",
    icon: FileText,
    accent: "orange",
    name: { en: "Income, Caste & Residence", pa: "ਆਮਦਨ, ਜਾਤੀ ਅਤੇ ਨਿਵਾਸ", hi: "आय, जाति और निवास" },
    description: {
      en: "Form, upload, and tracking guidance for common certificates.",
      pa: "ਆਮ ਸਰਟੀਫਿਕੇਟਾਂ ਲਈ ਫਾਰਮ, ਅਪਲੋਡ ਅਤੇ ਟ੍ਰੈਕਿੰਗ ਮਾਰਗਦਰਸ਼ਨ।",
      hi: "सामान्य प्रमाणपत्रों के लिए फ़ॉर्म, अपलोड और ट्रैकिंग मार्गदर्शन।",
    },
    turnaround: {
      en: "Usually 2 to 4 days",
      pa: "ਆਮ ਤੌਰ 'ਤੇ 2 ਤੋਂ 4 ਦਿਨ",
      hi: "आमतौर पर 2 से 4 दिन",
    },
    documents: {
      en: ["Identity proof", "Residence proof", "Income details", "Category proof if applicable"],
      pa: ["ਪਛਾਣ ਪੱਖ", "ਨਿਵਾਸ ਦਾ ਪੱਖ", "ਆਮਦਨ ਵੇਰਵੇ", "ਲੋੜੀਂਦੇ ਤੌਰ 'ਤੇ ਸ਼੍ਰੇਣੀ ਦਾ ਪੱਖ"],
      hi: ["पहचान पत्र", "निवास प्रमाण", "आय विवरण", "आवश्यकतानुसार जाति प्रमाण"],
    },
  },
  {
    id: "government-forms",
    category: "applications",
    icon: FileText,
    accent: "blue",
    name: { en: "Online Government Forms", pa: "ਆਨਲਾਈਨ ਸਰਕਾਰੀ ਫਾਰਮ", hi: "ऑनलाइन सरकारी फॉर्म" },
    description: {
      en: "Assistance with online forms, uploads, and application submissions.",
      pa: "ਆਨਲਾਈਨ ਫਾਰਮ, ਅਪਲੋਡ ਅਤੇ ਅਰਜ਼ੀ ਜਮ੍ਹਾਂ ਕਰਨ ਵਿੱਚ ਮਦਦ।",
      hi: "ऑनलाइन फ़ॉर्म, अपलोड और आवेदन जमा करने में सहायता।",
    },
    turnaround: {
      en: "Usually same day",
      pa: "ਆਮ ਤੌਰ 'ਤੇ ਉਸੇ ਦਿਨ",
      hi: "आमतौर पर उसी दिन",
    },
    documents: {
      en: ["Service or form name", "Identity proof", "Required documents", "Mobile number"],
      pa: ["ਸੇਵਾ ਜਾਂ ਫਾਰਮ ਦਾ ਨਾਮ", "ਪਛਾਣ ਪੱਖ", "ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼", "ਮੋਬਾਈਲ ਨੰਬਰ"],
      hi: ["सेवा या फ़ॉर्म का नाम", "पहचान पत्र", "आवश्यक दस्तावेज़", "मोबाइल नंबर"],
    },
  },
  {
    id: "print-scan",
    category: "document-work",
    icon: Printer,
    accent: "navy",
    name: { en: "Printout, Photocopy & Scanning", pa: "ਪ੍ਰਿੰਟਆਉਟ, ਫ਼ੋਟੋਕਾਪੀ ਅਤੇ ਸਕੈਨਿੰਗ", hi: "प्रिंटआउट, फ़ोटोकॉपी और स्कैनिंग" },
    description: {
      en: "Document printouts, copies, and clean digital scans.",
      pa: "ਦਸਤਾਵੇਜ਼ ਪ੍ਰਿੰਟਆਉਟ, ਕਾਪੀਆਂ ਅਤੇ ਸਾਫ਼ ਡਿਜੀਟਲ ਸਕੈਨ।",
      hi: "दस्तावेज़ प्रिंटआउट, कॉपियाँ और साफ़ डिजिटल स्कैन।",
    },
    turnaround: {
      en: "While you wait",
      pa: "ਤੁਹਾਡੀ ਉਡੀਕ ਦੌਰਾਨ",
      hi: "आपकी प्रतीक्षा के दौरान",
    },
    documents: {
      en: ["Document or file", "Page count", "Paper size", "Colour preference"],
      pa: ["ਦਸਤਾਵੇਜ਼ ਜਾਂ ਫ਼ਾਈਲ", "ਪੰਨਿਆਂ ਦੀ ਗਿਣਤੀ", "ਪੇਪਰ ਦਾ ਆਕਾਰ", "ਰੰਗ ਦੀ ਪਸੰਦ"],
      hi: ["दस्तावेज़ या फ़ाइल", "पृष्ठों की संख्या", "कागज़ का आकार", "रंग की पसंद"],
    },
  },
  {
    id: "other-services",
    category: "applications",
    icon: Sparkles,
    accent: "red",
    name: { en: "Other Online Services", pa: "ਹੋਰ ਆਨਲਾਈਨ ਸੇਵਾਵਾਂ", hi: "अन्य ऑनलाइन सेवाएं" },
    description: {
      en: "Tell us what you need and we will confirm whether we can assist.",
      pa: "ਦੱਸੋ ਤੁਹਾਨੂੰ ਕੀ ਚਾਹੀਦਾ ਹੈ, ਅਸੀਂ ਪੁਸ਼ਟੀ ਕਰਾਂਗੇ ਕਿ ਮਦਦ ਸੰਭਵ ਹੈ ਜਾਂ ਨਹੀਂ।",
      hi: "बताइए आपको क्या चाहिए, हम जाँच कर बताएंगे कि सहायता संभव है या नहीं।",
    },
    turnaround: {
      en: "Depends on the service",
      pa: "ਸੇਵਾ ਅਨੁਸਾਰ ਨਿਰਭਰ ਕਰਦਾ ਹੈ",
      hi: "सेवा पर निर्भर",
    },
    documents: {
      en: ["Service details", "Identity proof", "Available documents", "Mobile number"],
      pa: ["ਸੇਵਾ ਵੇਰਵੇ", "ਪਛਾਣ ਪੱਖ", "ਉਪਲਬਧ ਦਸਤਾਵੇਜ਼", "ਮੋਬਾਈਲ ਨੰਬਰ"],
      hi: ["सेवा विवरण", "पहचान पत्र", "उपलब्ध दस्तावेज़", "मोबाइल नंबर"],
    },
  },
];

export const contact = {
  phoneNumber: "9780332509",
  phoneDisplay: "+91 97803 32509",
  phoneDisplayPa: "+91 97803 32509",
  email: "techpointservices39@gmail.com",
} as const;
