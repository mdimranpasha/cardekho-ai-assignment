package com.api.cardekho.service;

import com.api.cardekho.converter.CarConverter;
import com.api.cardekho.dto.ApiResponse;
import com.api.cardekho.dto.PriorityType;
import com.api.cardekho.dto.RecommendationRequest;
import com.api.cardekho.dto.RecommendedCarResponse;
import com.api.cardekho.entity.Car;
import com.api.cardekho.enums.BodyType;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class RecommendationService {

    private static final double BUDGET_WEIGHT = 30.0;
    private static final double BODY_TYPE_WEIGHT = 20.0;
    private static final double FUEL_TYPE_WEIGHT = 15.0;
    private static final double SAFETY_WEIGHT = 15.0;
    private static final double MILEAGE_WEIGHT = 10.0;
    private static final double PRIORITY_WEIGHT = 10.0;

    private final CarService carService;
    private final CarConverter carConverter;

    public RecommendationService(CarService carService, CarConverter carConverter) {
        this.carService = carService;
        this.carConverter = carConverter;
    }

    public ApiResponse<RecommendedCarResponse> getRecommendations(RecommendationRequest request) {
        List<Car> cars = carService.getAllCarEntities();

        if (cars.isEmpty()) {
            return new ApiResponse<>(HttpStatus.OK.value(), "No cars found", null, null);
        }

        double maxMileage = cars.stream()
                .mapToDouble(Car::getMileageKmpl)
                .max()
                .orElse(1.0);

        List<ScoredCar> scoredCars = cars.stream()
                .map(car -> scoreCar(car, request, maxMileage))
                .sorted(Comparator
                        .comparingDouble(ScoredCar::score).reversed()
                        .thenComparing(scoredCar -> isWithinBudget(scoredCar.car(), request.getBudgetLakh()), Comparator.reverseOrder())
                        .thenComparing(scoredCar -> scoredCar.car().getSafetyRating(), Comparator.reverseOrder())
                        .thenComparing(scoredCar -> scoredCar.car().getPriceLakh()))
                .limit(5)
                .toList();

        List<RecommendedCarResponse> recommendations = scoredCars.stream()
                .map(this::toRecommendedCarResponse)
                .toList();

        return new ApiResponse<>(
                HttpStatus.OK.value(),
                "Recommendations fetched successfully",
                recommendations,
                null
        );
    }

    private ScoredCar scoreCar(Car car, RecommendationRequest request, double maxMileage) {
        double budgetScore = calculateBudgetScore(car.getPriceLakh(), request.getBudgetLakh());
        double bodyTypeScore = car.getBodyType() == request.getBodyType() ? BODY_TYPE_WEIGHT : 0.0;
        double fuelTypeScore = car.getFuelType() == request.getFuelType() ? FUEL_TYPE_WEIGHT : 0.0;
        double safetyScore = (car.getSafetyRating() / 5.0) * SAFETY_WEIGHT;
        double mileageScore = (car.getMileageKmpl() / maxMileage) * MILEAGE_WEIGHT;
        double priorityScore = calculatePriorityScore(car, request.getPriority(), request.getBudgetLakh(), maxMileage);

        double totalScore = budgetScore + bodyTypeScore + fuelTypeScore + safetyScore + mileageScore + priorityScore;

        List<String> reasons = buildReasons(
                car,
                request,
                budgetScore,
                bodyTypeScore,
                fuelTypeScore,
                safetyScore,
                mileageScore,
                priorityScore,
                maxMileage
        );

        return new ScoredCar(car, roundToTwoDecimals(totalScore), reasons);
    }

    private double calculateBudgetScore(double priceLakh, double budgetLakh) {
        if (budgetLakh <= 0) {
            return 0.0;
        }

        if (priceLakh <= budgetLakh) {
            return BUDGET_WEIGHT;
        }

        double overBudgetRatio = (priceLakh - budgetLakh) / budgetLakh;
        if (overBudgetRatio <= 0.10) {
            return 20.0;
        }
        if (overBudgetRatio <= 0.20) {
            return 10.0;
        }
        return 0.0;
    }

    private double calculatePriorityScore(Car car, PriorityType priority, double budgetLakh, double maxMileage) {
        return switch (priority) {
            case SAFETY -> (car.getSafetyRating() / 5.0) * PRIORITY_WEIGHT;
            case MILEAGE -> (car.getMileageKmpl() / maxMileage) * PRIORITY_WEIGHT;
            case FAMILY_COMFORT -> calculateFamilyComfortScore(car);
            case LOWEST_PRICE -> calculateLowestPriceScore(car.getPriceLakh(), budgetLakh);
        };
    }

    private double calculateFamilyComfortScore(Car car) {
        double seatingComponent = Math.min(car.getSeatingCapacity(), 7) / 7.0;
        double bodyTypeComponent = (car.getBodyType() == BodyType.SUV || car.getBodyType() == BodyType.CROSSOVER) ? 1.0 : 0.6;
        return ((seatingComponent * 0.6) + (bodyTypeComponent * 0.4)) * PRIORITY_WEIGHT;
    }

    private double calculateLowestPriceScore(double priceLakh, double budgetLakh) {
        if (budgetLakh <= 0) {
            return 0.0;
        }

        if (priceLakh > budgetLakh * 1.20) {
            return 0.0;
        }

        double normalized = 1 - Math.min(priceLakh / budgetLakh, 1.0);
        return normalized * PRIORITY_WEIGHT;
    }

    private List<String> buildReasons(
            Car car,
            RecommendationRequest request,
            double budgetScore,
            double bodyTypeScore,
            double fuelTypeScore,
            double safetyScore,
            double mileageScore,
            double priorityScore,
            double maxMileage
    ) {
        List<String> reasons = new ArrayList<>();

        if (budgetScore == BUDGET_WEIGHT) {
            reasons.add("Fits within your budget");
        } else if (budgetScore >= 20.0) {
            reasons.add("Slightly above your budget but still close");
        }

        if (bodyTypeScore > 0) {
            reasons.add("Matches your preferred " + request.getBodyType().name() + " body type");
        }

        if (fuelTypeScore > 0) {
            reasons.add("Matches your preferred " + request.getFuelType().name() + " fuel type");
        }

        if (safetyScore >= 12.0) {
            reasons.add("Strong safety rating of " + car.getSafetyRating() + "/5");
        }

        if (mileageScore >= (0.75 * MILEAGE_WEIGHT)) {
            reasons.add("Offers above-average mileage for this shortlist");
        }

        if (priorityScore > 0) {
            reasons.add(buildPriorityReason(car, request.getPriority(), maxMileage));
        }

        if (reasons.isEmpty()) {
            reasons.add("Balanced overall fit across price, features, and ownership needs");
        }

        return reasons;
    }

    private String buildPriorityReason(Car car, PriorityType priority, double maxMileage) {
        return switch (priority) {
            case SAFETY -> "Scores well for your safety priority";
            case MILEAGE -> car.getMileageKmpl() >= (0.80 * maxMileage)
                    ? "Mileage strongly aligns with your priority"
                    : "Mileage contributes positively to your preference";
            case FAMILY_COMFORT -> "Seating capacity and body style suit family comfort needs";
            case LOWEST_PRICE -> "Competitive pricing supports your lowest price priority";
        };
    }

    private RecommendedCarResponse toRecommendedCarResponse(ScoredCar scoredCar) {
        Car car = scoredCar.car();
        return carConverter.toRecommendedCarResponse(car, scoredCar.score(), scoredCar.reasons());
    }

    private boolean isWithinBudget(Car car, double budgetLakh) {
        return car.getPriceLakh() <= budgetLakh;
    }

    private double roundToTwoDecimals(double value) {
        return Math.round(value * 100.0) / 100.0;
    }

    private record ScoredCar(Car car, double score, List<String> reasons) {
    }
}
