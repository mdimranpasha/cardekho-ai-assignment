package com.api.cardekho.converter;

import com.api.cardekho.dto.CarResponse;
import com.api.cardekho.dto.RecommendedCarResponse;
import com.api.cardekho.entity.Car;
import java.util.Arrays;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class CarConverter {

    public CarResponse toCarResponse(Car car) {
        return CarResponse.builder()
                .id(car.getId())
                .brand(car.getBrand())
                .model(car.getModel())
                .variant(car.getVariant())
                .imageUrl(car.getImageUrl())
                .priceLakh(car.getPriceLakh())
                .mileageKmpl(car.getMileageKmpl())
                .bodyType(car.getBodyType())
                .fuelType(car.getFuelType())
                .safetyRating(car.getSafetyRating())
                .seatingCapacity(car.getSeatingCapacity())
                .pros(toList(car.getPros()))
                .cons(toList(car.getCons()))
                .reviewSummary(car.getReviewSummary())
                .build();
    }

    public RecommendedCarResponse toRecommendedCarResponse(Car car, Double matchScore, List<String> reasons) {
        return RecommendedCarResponse.builder()
                .id(car.getId())
                .brand(car.getBrand())
                .model(car.getModel())
                .variant(car.getVariant())
                .imageUrl(car.getImageUrl())
                .priceLakh(car.getPriceLakh())
                .mileageKmpl(car.getMileageKmpl())
                .bodyType(car.getBodyType())
                .fuelType(car.getFuelType())
                .safetyRating(car.getSafetyRating())
                .seatingCapacity(car.getSeatingCapacity())
                .pros(toList(car.getPros()))
                .cons(toList(car.getCons()))
                .reviewSummary(car.getReviewSummary())
                .matchScore(matchScore)
                .reasons(reasons)
                .build();
    }

    private List<String> toList(String delimitedText) {
        return Arrays.stream(delimitedText.split("\\|"))
                .map(String::trim)
                .filter(value -> !value.isBlank())
                .toList();
    }
}
