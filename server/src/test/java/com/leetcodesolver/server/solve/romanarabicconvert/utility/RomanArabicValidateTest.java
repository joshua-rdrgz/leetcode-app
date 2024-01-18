package com.leetcodesolver.server.solve.romanarabicconvert.utility;

import com.leetcodesolver.server.error.InvalidInputException;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class RomanArabicValidateTest {
    // isArabicNumeral TESTS
    // //////////////////////////////////////////

    @Test
    public void isArabicNumeral_validArabicString_returnsTrue() {
        assertTrue(RomanArabicValidate.isArabicNumeral("123"));
    }

    @Test
    public void isArabicNumeral_invalidArabicString_returnsFalse() {
        assertFalse(RomanArabicValidate.isArabicNumeral("ABC"));
    }

    @Test
    public void isArabicNumeral_emptyString_returnsFalse() {
        assertFalse(RomanArabicValidate.isArabicNumeral(""));
    }

    // validateArabicNumeral TESTS
    // //////////////////////////////////////////

    @Test
    public void validateArabicNumeral_validNumber_doesNotThrow() {
        RomanArabicValidate.validateData(2000); // Should not throw an exception
    }

    @Test
    public void validateArabicNumeral_numberLessThan1_throwsException() {
        assertThrows(InvalidInputException.class,
                () -> RomanArabicValidate.validateData(0));
    }

    @Test
    public void validateArabicNumeral_numberGreaterThan3999_throwsException() {
        assertThrows(InvalidInputException.class,
                () -> RomanArabicValidate.validateData(4000));
    }

    // validateRomanNumeral TESTS
    // //////////////////////////////////////////

    @Test
    public void validateRomanNumeral_validRomanNumeral_doesNotThrow() {
        RomanArabicValidate.validateData("MMXXI"); // Should not throw an exception
    }

    @Test
    public void validateRomanNumeral_invalidRomanNumeral_throwsException() {
        assertThrows(InvalidInputException.class,
                () -> RomanArabicValidate.validateData("IIII"));
    }
}
