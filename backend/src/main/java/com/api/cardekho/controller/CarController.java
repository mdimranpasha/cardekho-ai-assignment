package com.api.cardekho.controller;

import com.api.cardekho.dto.ApiResponse;
import com.api.cardekho.dto.CarResponse;
import com.api.cardekho.dto.CompareRequest;
import com.api.cardekho.service.CarService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CarController {

    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping("/cars")
    public ApiResponse<CarResponse> getAllCars() {
        return carService.getAllCars();
    }

    @PostMapping("/compare")
    public ApiResponse<CarResponse> compareCars(@Valid @RequestBody CompareRequest request) {
        return carService.compareCars(request.getCarIds());
    }
}
