package com.api.cardekho.dto;

import com.api.cardekho.enums.BodyType;
import com.api.cardekho.enums.FuelType;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecommendedCarResponse {

    private Long id;
    private String brand;
    private String model;
    private String variant;
    private String imageUrl;
    private Double priceLakh;
    private Double mileageKmpl;
    private BodyType bodyType;
    private FuelType fuelType;
    private Integer safetyRating;
    private Integer seatingCapacity;
    private List<String> pros;
    private List<String> cons;
    private String reviewSummary;
    private Double matchScore;
    private List<String> reasons;
}
