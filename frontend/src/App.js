import { useState } from "react";
import CompareSection from "./components/CompareSection";
import HomeSection from "./components/HomeSection";
import PreferenceForm from "./components/PreferenceForm";
import RecommendationSection from "./components/RecommendationSection";
import { compareCars, fetchRecommendations } from "./config/api";

const initialFormState = {
  budgetLakh: "",
  bodyType: "SUV",
  fuelType: "PETROL",
  priority: "SAFETY"
};

export default function App() {
  const [formState, setFormState] = useState(initialFormState);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedCarIds, setSelectedCarIds] = useState([]);
  const [comparisonCars, setComparisonCars] = useState([]);
  const [isRecommendationsLoading, setIsRecommendationsLoading] = useState(false);
  const [isCompareLoading, setIsCompareLoading] = useState(false);
  const [recommendationError, setRecommendationError] = useState("");
  const [compareError, setCompareError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormState((currentState) => ({
      ...currentState,
      [name]: value
    }));
  }

  async function handleFindCars(event) {
    event.preventDefault();

    setIsRecommendationsLoading(true);
    setRecommendationError("");
    setCompareError("");
    setComparisonCars([]);
    setSelectedCarIds([]);
    setHasSearched(true);

    try {
      const result = await fetchRecommendations({
        budgetLakh: Number(formState.budgetLakh),
        bodyType: formState.bodyType,
        fuelType: formState.fuelType,
        priority: formState.priority
      });

      setRecommendations(result);
    } catch (error) {
      setRecommendations([]);
      setRecommendationError(error.message);
    } finally {
      setIsRecommendationsLoading(false);
    }
  }

  function handleToggleCompare(carId) {
    setCompareError("");
    setSelectedCarIds((currentIds) => {
      if (currentIds.includes(carId)) {
        return currentIds.filter((id) => id !== carId);
      }

      if (currentIds.length >= 3) {
        return currentIds;
      }

      return [...currentIds, carId];
    });
  }

  async function handleCompareCars() {
    if (selectedCarIds.length < 2 || selectedCarIds.length > 3) {
      setCompareError("Please select between 2 and 3 cars to compare.");
      return;
    }

    setIsCompareLoading(true);
    setCompareError("");

    try {
      const cars = await compareCars(selectedCarIds);
      setComparisonCars(cars);
    } catch (error) {
      setComparisonCars([]);
      setCompareError(error.message);
    } finally {
      setIsCompareLoading(false);
    }
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-6">
        <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/85 px-5 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                Smart Car Shortlist Assistant
              </div>
              <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                Buyer recommendation workspace
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Recommendations
                </div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">
                  {recommendations.length}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Compared
                </div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">
                  {comparisonCars.length}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Selected
                </div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">
                  {selectedCarIds.length}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Status
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-900">
                  {isRecommendationsLoading || isCompareLoading ? "Working" : "Ready"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <HomeSection />

        <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)] xl:items-start">
          <PreferenceForm
            formState={formState}
            isLoading={isRecommendationsLoading}
            onChange={handleInputChange}
            onSubmit={handleFindCars}
          />

          <RecommendationSection
            cars={recommendations}
            error={recommendationError}
            hasSearched={hasSearched}
            isLoading={isRecommendationsLoading}
            onToggleCompare={handleToggleCompare}
            selectedCarIds={selectedCarIds}
          />
        </div>

        <CompareSection
          cars={comparisonCars}
          error={compareError}
          isLoading={isCompareLoading}
          onCompare={handleCompareCars}
          selectedCount={selectedCarIds.length}
        />
      </div>
    </main>
  );
}
