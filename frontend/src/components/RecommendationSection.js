import RecommendationCard from "./RecommendationCard";

export default function RecommendationSection({
  cars,
  hasSearched,
  isLoading,
  error,
  selectedCarIds,
  onToggleCompare
}) {
  return (
    <section className="rounded-[1.9rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.07)] backdrop-blur">
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
            Ranked Results
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">
            Recommendation Results
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            The top backend matches appear here with scoring reasons and quick
            comparison controls.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:min-w-64">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
              Cars shown
            </div>
            <div className="mt-2 text-xl font-semibold text-slate-900">{cars.length}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
              Selected
            </div>
            <div className="mt-2 text-xl font-semibold text-slate-900">
              {selectedCarIds.length}
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center text-slate-500">
          Searching the shortlist engine...
        </div>
      ) : null}

      {!isLoading && error ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 px-6 py-5 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {!isLoading && !error && !hasSearched ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center text-slate-500">
          Enter buyer preferences to generate a shortlist.
        </div>
      ) : null}

      {!isLoading && !error && hasSearched && cars.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center text-slate-500">
          No recommendations came back for the selected preferences.
        </div>
      ) : null}

      {!isLoading && !error && cars.length > 0 ? (
        <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
          {cars.map((car) => (
            <RecommendationCard
              car={car}
              isSelected={selectedCarIds.includes(car.id)}
              key={car.id}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
