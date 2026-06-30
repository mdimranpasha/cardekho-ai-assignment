package com.api.cardekho.entity;

import com.api.cardekho.enums.BodyType;
import com.api.cardekho.enums.FuelType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cars")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String brand;

    @Column(nullable = false, length = 50)
    private String model;

    @Column(nullable = false, length = 100)
    private String variant;

    @Column(nullable = false, length = 255)
    private String imageUrl;

    @Column(nullable = false)
    private Double priceLakh;

    @Column(nullable = false)
    private Double mileageKmpl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private BodyType bodyType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private FuelType fuelType;

    @Column(nullable = false)
    private Integer safetyRating;

    @Column(nullable = false)
    private Integer seatingCapacity;

    @Column(nullable = false, length = 500)
    private String pros;

    @Column(nullable = false, length = 500)
    private String cons;

    @Column(nullable = false, length = 1000)
    private String reviewSummary;
}
