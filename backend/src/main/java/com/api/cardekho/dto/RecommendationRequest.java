package com.api.cardekho.dto;

import com.api.cardekho.enums.BodyType;
import com.api.cardekho.enums.FuelType;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationRequest {

    @NotNull(message = "budgetLakh is required")
    @DecimalMin(value = "1.0", message = "budgetLakh must be at least 1 lakh")
    @DecimalMax(value = "100.0", message = "budgetLakh must be at most 100 lakh")
    private Double budgetLakh;

    @NotNull(message = "bodyType is required")
    private BodyType bodyType;

    @NotNull(message = "fuelType is required")
    private FuelType fuelType;

    @NotNull(message = "priority is required")
    private PriorityType priority;
}
