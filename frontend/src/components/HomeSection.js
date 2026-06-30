export default function HomeSection() {
  return (
    <section className="overflow-hidden rounded-[1.9rem] border border-slate-200/40 bg-[linear-gradient(135deg,#0f172a_0%,#172554_55%,#1d4ed8_100%)] p-8 shadow-[0_28px_80px_rgba(15,23,42,0.12)] xl:p-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_320px] lg:items-end">
        <div className="max-w-4xl">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-100">
            Smart Car Shortlist Assistant
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Turn scattered buyer preferences into a shortlist that feels ready
            for a real sales conversation.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg">
            Built for uncertain buyers who need clarity fast. Enter the key
            constraints, review ranked recommendations, and compare serious
            options without digging through endless tabs.
          </p>
        </div>

        <div className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-100/80">
              What it handles
            </div>
            <div className="mt-2 text-sm leading-6 text-slate-100">
              Budget fit, fuel preference, body type, safety, mileage, family
              comfort, and comparison-ready summaries.
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/10 px-4 py-3">
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-200/70">
                Output
              </div>
              <div className="mt-2 text-sm font-semibold text-white">
                Top 5 ranked cars
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3">
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-200/70">
                Flow
              </div>
              <div className="mt-2 text-sm font-semibold text-white">
                Select and compare
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
