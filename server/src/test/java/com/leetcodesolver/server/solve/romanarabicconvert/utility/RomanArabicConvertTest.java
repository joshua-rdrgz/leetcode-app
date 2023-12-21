package com.leetcodesolver.server.solve.romanarabicconvert.utility;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class RomanArabicConvertTest {

    @Test
    public void toArabicNumber_simpleConversion_returnsCorrectValue() {
        int result = RomanArabicConvert.toArabicNumber("VIII");
        assertEquals(8, result);
    }

    @Test
    public void toArabicNumber_complexConversion_returnsCorrectValue() {
        int result = RomanArabicConvert.toArabicNumber("MCMXCIV");
        assertEquals(1994, result);
    }

    // toRomanNumeral TESTS
    // //////////////////////////////////////////

    @Test
    public void toRomanNumeral_simpleConversion_returnsCorrectValue() {
        String result = RomanArabicConvert.toRomanNumeral(15);
        assertEquals("XV", result);
    }

    @Test
    public void toRomanNumeral_complexConversion_returnsCorrectValue() {
        String result = RomanArabicConvert.toRomanNumeral(3999);
        assertEquals("MMMCMXCIX", result);
    }
}
