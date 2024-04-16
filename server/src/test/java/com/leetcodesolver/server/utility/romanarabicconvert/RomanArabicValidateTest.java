package com.leetcodesolver.server.utility.romanarabicconvert;

import com.leetcodesolver.server.exception.InvalidInputException;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@ActiveProfiles("test")
public class RomanArabicValidateTest {
    // validateArabicNumeral TESTS
    // //////////////////////////////////////////

    @Test
    public void validateArabicNumeral_validNumber_doesNotThrow() {
        RomanArabicValidate.validateArabicNumeral(2000); // Should not throw an exception
    }

    @Test
    public void validateArabicNumeral_numberLessThan1_throwsException() {
        assertThrows(InvalidInputException.class,
                () -> RomanArabicValidate.validateArabicNumeral(0));
    }

    @Test
    public void validateArabicNumeral_numberGreaterThan3999_throwsException() {
        assertThrows(InvalidInputException.class,
                () -> RomanArabicValidate.validateArabicNumeral(4000));
    }

    // validateRomanNumeral TESTS
    // //////////////////////////////////////////

    @Test
    public void validateRomanNumeral_validRomanNumeral_doesNotThrow() {
        RomanArabicValidate.validateRomanNumeral("MMXXI"); // Should not throw an exception
    }

    @Test
    public void validateRomanNumeral_invalidRomanNumeral_throwsException() {
        assertThrows(InvalidInputException.class,
                () -> RomanArabicValidate.validateRomanNumeral("IIII"));
    }
}
