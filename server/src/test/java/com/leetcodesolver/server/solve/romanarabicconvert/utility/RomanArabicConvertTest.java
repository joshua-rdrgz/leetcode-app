package com.leetcodesolver.server.solve.romanarabicconvert.utility;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("test")
public class RomanArabicConvertTest {

    @Test
    public void toArabicNumeral_simpleConversion_returnsCorrectValue() {
        int result = RomanArabicConvert.toArabicNumeral("VIII");
        assertEquals(8, result);
    }

    @Test
    public void toArabicNumeral_complexConversion_returnsCorrectValue() {
        int result = RomanArabicConvert.toArabicNumeral("MCMXCIV");
        assertEquals(1994, result);
    }

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
