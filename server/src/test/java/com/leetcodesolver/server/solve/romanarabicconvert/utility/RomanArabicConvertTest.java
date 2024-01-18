package com.leetcodesolver.server.solve.romanarabicconvert.utility;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class RomanArabicConvertTest {

    @Test
    public void toArabicNumber_simpleConversion_returnsCorrectValue() {
        int result = RomanArabicConvert.convertData("VIII");
        assertEquals(8, result);
    }

    @Test
    public void toArabicNumber_complexConversion_returnsCorrectValue() {
        int result = RomanArabicConvert.convertData("MCMXCIV");
        assertEquals(1994, result);
    }

    @Test
    public void toRomanNumeral_simpleConversion_returnsCorrectValue() {
        String result = RomanArabicConvert.convertData(15);
        assertEquals("XV", result);
    }

    @Test
    public void toRomanNumeral_complexConversion_returnsCorrectValue() {
        String result = RomanArabicConvert.convertData(3999);
        assertEquals("MMMCMXCIX", result);
    }
}
