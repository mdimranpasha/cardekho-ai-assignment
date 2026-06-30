package com.api.cardekho.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompareRequest {

    @NotEmpty(message = "At least two car IDs are required for comparison")
    @Size(min = 2, max = 5, message = "You can compare between 2 and 5 cars")
    private List<@NotNull(message = "carIds cannot contain null values") Long> carIds;
}
