import type { Service } from "@/components/site-data";

type ServiceLocalLabelProps = {
  service: Pick<Service, "titlePa" | "titleHi">;
  className?: string;
};

/**
 * Punjabi and Hindi were previously one string inside an English <p>, so the
 * browser fell back to a random system font and screen readers announced the
 * text with an English voice. Each script now gets its own element, language
 * tag, and typeface.
 */
export default function ServiceLocalLabel({ service, className = "" }: ServiceLocalLabelProps) {
  return (
    <span className={className}>
      <span lang="pa" className="font-local">
        {service.titlePa}
      </span>
      <span aria-hidden="true" className="mx-1.5 text-line-strong">
        /
      </span>
      <span lang="hi" className="font-local-hi">
        {service.titleHi}
      </span>
    </span>
  );
}
