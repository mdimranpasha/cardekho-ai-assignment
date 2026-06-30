import { DEFAULT_CAR_IMAGE } from "../config/api";
import { formatLabel, formatMileage, formatPrice } from "../utils/formatters";

function CompareCell({ children, heading }) {
  return (
    <tr className="border-b border-slate-200 last:border-b-0">
      <th className="w-44 bg-slate-50 px-4 py-4 text-left align-top text-sm font-semibold text-slate-700">
        {heading}
      </th>
      {children}
    </tr>
  );
}

function renderList(items) {
  if (!items?.length) {
    return "N/A";
  }

  return (
    <ul className="space-y-2 text-sm leading-6 text-slate-600">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CompareSection({
  cars,
  selectedCount,
  isLoading,
  error,
  onCompare
}) {
  return (
    <section className="rounded-[1.9rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.07)] backdrop-blur">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
            Comparison Workspace
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Compare Cars</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Select 2 to 3 recommendations, then compare them side by side.
          </p>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          disabled={selectedCount < 2 || selectedCount > 3 || isLoading}
          onClick={onCompare}
          type="button"
        >
          {isLoading ? "Comparing..." : "Compare Selected Cars"}
        </button>
      </div>

      <div className="mt-4 inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500">
        Selected cars:
        <span className="ml-2 font-semibold text-slate-800">{selectedCount}</span>
      </div>

      {error ? (
        <div className="mt-5 rounded-3xl border border-rose-200 bg-rose-50 px-6 py-5 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {!error && cars.length === 0 ? (
        <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center text-slate-500">
          Comparison results will appear here after selecting cars and clicking
          compare.
        </div>
      ) : null}

      {cars.length > 0 ? (
        <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <tbody>
                <CompareCell heading="Car">
                  {cars.map((car) => (
                    <td className="min-w-72 px-4 py-4 align-top" key={car.id}>
                      <img
                        alt={`${car.brand} ${car.model}`}
                        className="h-40 w-full rounded-2xl object-cover"
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = DEFAULT_CAR_IMAGE;
                        }}
                        src={car.imageUrl || DEFAULT_CAR_IMAGE}
                      />
                      <div className="mt-4">
                        <div className="text-lg font-semibold text-slate-900">
                          {car.brand} {car.model}
                        </div>
                        <div className="text-sm text-slate-500">{car.variant}</div>
                      </div>
                    </td>
                  ))}
                </CompareCell>

                <CompareCell heading="Price">
                  {cars.map((car) => (
                    <td className="px-4 py-4 text-sm text-slate-700" key={car.id}>
                      {formatPrice(car.priceLakh)}
                    </td>
                  ))}
                </CompareCell>

                <CompareCell heading="Mileage">
                  {cars.map((car) => (
                    <td className="px-4 py-4 text-sm text-slate-700" key={car.id}>
                      {formatMileage(car.mileageKmpl)}
                    </td>
                  ))}
                </CompareCell>

                <CompareCell heading="Fuel Type">
                  {cars.map((car) => (
                    <td className="px-4 py-4 text-sm text-slate-700" key={car.id}>
                      {formatLabel(car.fuelType)}
                    </td>
                  ))}
                </CompareCell>

                <CompareCell heading="Body Type">
                  {cars.map((car) => (
                    <td className="px-4 py-4 text-sm text-slate-700" key={car.id}>
                      {formatLabel(car.bodyType)}
                    </td>
                  ))}
                </CompareCell>

                <CompareCell heading="Safety Rating">
                  {cars.map((car) => (
                    <td className="px-4 py-4 text-sm text-slate-700" key={car.id}>
                      {car.safetyRating}/5
                    </td>
                  ))}
                </CompareCell>

                <CompareCell heading="Seating Capacity">
                  {cars.map((car) => (
                    <td className="px-4 py-4 text-sm text-slate-700" key={car.id}>
                      {car.seatingCapacity}
                    </td>
                  ))}
                </CompareCell>

                <CompareCell heading="Pros">
                  {cars.map((car) => (
                    <td className="px-4 py-4 align-top" key={car.id}>
                      {renderList(car.pros)}
                    </td>
                  ))}
                </CompareCell>

                <CompareCell heading="Cons">
                  {cars.map((car) => (
                    <td className="px-4 py-4 align-top" key={car.id}>
                      {renderList(car.cons)}
                    </td>
                  ))}
                </CompareCell>

                <CompareCell heading="Review Summary">
                  {cars.map((car) => (
                    <td className="px-4 py-4 text-sm leading-6 text-slate-700" key={car.id}>
                      {car.reviewSummary || "N/A"}
                    </td>
                  ))}
                </CompareCell>
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </section>
  );
}
