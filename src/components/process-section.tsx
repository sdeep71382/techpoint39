import { steps } from "@/components/site-data";

export default function ProcessSection() {
  return (
    <section id="process" className="band-navy scroll-mt-20">
      <div className="shell section-pad">
        <div className="max-w-2xl">
          <p className="kicker">How it works</p>
          <h2 className="section-title mt-3">A useful path, from question to next step.</h2>
          <p className="section-copy mt-4 text-pretty">
            Each stage exists to remove uncertainty before your request moves forward.
          </p>
        </div>

        <ol className="mt-12 grid gap-4 md:grid-cols-4 md:gap-0">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li
                key={step.number}
                className={
                  "rounded-card border border-white/15 bg-white/[0.04] p-5 md:rounded-none md:border-y-0 md:border-l-0 md:bg-transparent md:p-6 md:py-8 " +
                  (index === 0 ? "md:pl-0" : "md:border-l md:border-white/15")
                }
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-small font-bold tracking-[0.18em] text-signal">
                    {step.number}
                  </span>
                  <Icon className="h-5 w-5 text-on-navy-muted" />
                </div>
                <h3 className="mt-6 text-h4 font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-small leading-relaxed text-on-navy-soft">{step.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
