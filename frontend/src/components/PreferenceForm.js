const bodyTypes = ["SUV", "SEDAN", "HATCHBACK", "CROSSOVER"];
const fuelTypes = ["PETROL", "DIESEL", "CNG", "EV"];
const priorities = [
  { value: "SAFETY", label: "Safety" },
  { value: "MILEAGE", label: "Mileage" },
  { value: "FAMILY_COMFORT", label: "Family Comfort" },
  { value: "LOWEST_PRICE", label: "Lowest Price" }
];

function InputField({ label, children, hint }) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        {hint ? <span className="text-xs font-medium text-slate-400">{hint}</span> : null}
      </div>
      {children}
    </label>
  );
}

export default function PreferenceForm({
  formState,
  onChange,
  onSubmit,
  isLoading
}) {
  return (
    <section className="rounded-[1.9rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.07)] backdrop-blur xl:sticky xl:top-6">
      <div className="mb-6 border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
          Buyer Inputs
        </div>
        <h2 className="mt-3 text-2xl font-semibold text-slate-950">
          Buyer Preference Form
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Enter the preferences that matter most, then let the backend rank the
          best matches.
        </p>
      </div>

      <form className="space-y-5" onSubmit={onSubmit}>
        <div className="grid gap-5">
          <InputField label="Budget in Lakhs" hint="Example: 12.5">
            <input
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
              min="1"
              name="budgetLakh"
              onChange={onChange}
              placeholder="Enter budget"
              step="0.1"
              type="number"
              value={formState.budgetLakh}
            />
          </InputField>

          <InputField label="Body Type">
            <select
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
              name="bodyType"
              onChange={onChange}
              value={formState.bodyType}
            >
              {bodyTypes.map((bodyType) => (
                <option key={bodyType} value={bodyType}>
                  {bodyType.charAt(0) + bodyType.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </InputField>

          <InputField label="Fuel Type">
            <select
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
              name="fuelType"
              onChange={onChange}
              value={formState.fuelType}
            >
              {fuelTypes.map((fuelType) => (
                <option key={fuelType} value={fuelType}>
                  {fuelType.charAt(0) + fuelType.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </InputField>

          <InputField label="Priority">
            <select
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
              name="priority"
              onChange={onChange}
              value={formState.priority}
            >
              {priorities.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </InputField>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Submission
          </div>
          <div className="mt-2 text-sm leading-6 text-slate-500">
            Send preferences to the shortlist engine and refresh the ranked cards.
          </div>
        </div>

        <button
          className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Finding cars..." : "Find Best Cars"}
        </button>
      </form>
    </section>
  );
}
