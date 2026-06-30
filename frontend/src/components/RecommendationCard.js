import { DEFAULT_CAR_IMAGE } from "../config/api";
import { formatLabel, formatMileage, formatPrice } from "../utils/formatters";

function SpecPill({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </div>
      <div className="mt-1.5 text-sm font-semibold text-slate-800">{value}</div>
    </div>
  );
}

export default function RecommendationCard({
  car,
  isSelected,
  onToggleCompare
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_24px_50px_rgba(15,23,42,0.10)]">
      <div className="relative h-56 bg-slate-100">
        <img
          alt={`${car.brand} ${car.model}`}
          className="h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = DEFAULT_CAR_IMAGE;
          }}
          src={car.imageUrl || DEFAULT_CAR_IMAGE}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/75 to-transparent px-5 pb-5 pt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">
                {formatLabel(car.bodyType)} / {formatLabel(car.fuelType)}
              </div>
              <div className="mt-2 text-2xl font-semibold text-white">
                {car.brand} {car.model}
              </div>
              <div className="mt-1 text-sm text-slate-200">{car.variant}</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/90 px-3 py-2 text-right shadow-sm">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Match
              </div>
              <div className="mt-1 text-lg font-semibold text-slate-950">
                {car.matchScore?.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Shortlist fit
            </div>
            <div className="mt-2 text-sm font-medium text-slate-600">
              {formatPrice(car.priceLakh)} / {formatMileage(car.mileageKmpl)}
            </div>
          </div>

          <label className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
            <input
              checked={isSelected}
              className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-sky-500"
              onChange={() => onToggleCompare(car.id)}
              type="checkbox"
            />
            Compare
          </label>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <SpecPill label="Price" value={formatPrice(car.priceLakh)} />
          <SpecPill label="Mileage" value={formatMileage(car.mileageKmpl)} />
          <SpecPill label="Fuel" value={formatLabel(car.fuelType)} />
          <SpecPill label="Body" value={formatLabel(car.bodyType)} />
          <SpecPill label="Safety" value={`${car.safetyRating}/5`} />
          <SpecPill label="Seats" value={car.seatingCapacity || "N/A"} />
        </div>

        <div className="mt-5 rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4">
          <h4 className="text-sm font-semibold text-slate-900">
            Why this car was recommended
          </h4>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            {(car.reasons || []).map((reason) => (
              <li key={reason} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-900" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
