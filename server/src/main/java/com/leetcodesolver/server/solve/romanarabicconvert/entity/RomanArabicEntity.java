package com.leetcodesolver.server.solve.romanarabicconvert.entity;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "roman_int_conversion")
@Data
@NoArgsConstructor
public class RomanArabicEntity {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name = "roman_numeral")
    private String romanNumeral;

    @Column(name = "number")
    private int number;

    public RomanArabicEntity(String romanNumeral, int number) {
        this.romanNumeral = romanNumeral;
        this.number = number;
    }
}
