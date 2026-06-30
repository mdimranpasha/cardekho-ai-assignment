package com.api.cardekho.service;

import com.api.cardekho.converter.CarConverter;
import com.api.cardekho.dto.ApiResponse;
import com.api.cardekho.dto.CarResponse;
import com.api.cardekho.entity.Car;
import com.api.cardekho.exception.ResourceNotFoundException;
import com.api.cardekho.repository.CarRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.List;

@Service
public class CarService {

    private final CarRepository carRepository;
    private final CarConverter carConverter;

    public CarService(CarRepository carRepository, CarConverter carConverter) {
        this.carRepository = carRepository;
        this.carConverter = carConverter;
    }

    public ApiResponse<CarResponse> getAllCars() {
        List<CarResponse> cars = carRepository.findAll()
                .stream()
                .map(carConverter::toCarResponse)
                .toList();

        if (cars.isEmpty()) {
            return new ApiResponse<>(HttpStatus.OK.value(), "No cars found", null, null);
        }

        return new ApiResponse<>(HttpStatus.OK.value(), "Cars fetched successfully", cars, null);
    }

    public ApiResponse<CarResponse> compareCars(List<Long> carIds) {
        List<Long> uniqueCarIds = new LinkedHashSet<>(carIds).stream().toList();

        if (uniqueCarIds.size() != carIds.size()) {
            throw new IllegalArgumentException("Duplicate car IDs are not allowed in compare request");
        }

        List<Car> cars = carRepository.findAllById(uniqueCarIds);

        if (cars.size() != uniqueCarIds.size()) {
            throw new ResourceNotFoundException("One or more car IDs were not found");
        }

        List<CarResponse> carResponses = cars.stream()
                .map(carConverter::toCarResponse)
                .toList();

        return new ApiResponse<>(HttpStatus.OK.value(), "Cars compared successfully", carResponses, null);

    }

    public List<Car> getAllCarEntities() {
        return carRepository.findAll();
    }
}
