package com.api.cardekho.controller;

import com.api.cardekho.dto.ApiResponse;
import com.api.cardekho.dto.RecommendationRequest;
import com.api.cardekho.dto.RecommendedCarResponse;
import com.api.cardekho.service.RecommendationService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @PostMapping("/recommendations")
    public ApiResponse<RecommendedCarResponse> getRecommendations(@Valid @RequestBody RecommendationRequest request) {
        return recommendationService.getRecommendations(request);
    }
}
