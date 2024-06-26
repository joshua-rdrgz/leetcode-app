package com.leetcodesolver.server.utility.romanarabicconvert;

import com.leetcodesolver.server.exception.InvalidInputException;

public class RomanArabicInput {
    private String input;

    public RomanArabicInput(String input) {
        // sanitize input by conforming potential RNs to uppercase
        this.input = input.toUpperCase();
    }

    public boolean isArabicNumeral() {
        try {
            Integer.parseInt(input);
            return true;
        } catch (NumberFormatException exception) {
            return false;
        }
    }

    public int getArabicNumeral() {
        try {
            int arabicNumeral = Integer.parseInt(input);
            return arabicNumeral;
        } catch (NumberFormatException exception) {
            throw new InvalidInputException(
                    String.format("This input: \"%s\" is not a valid Arabic Numeral.", input));
        }
    }

    public String getRomanNumeral() {
        if (isArabicNumeral()) {
            throw new InvalidInputException(
                    String.format("This input: \"%s\" is an Arabic numeral, not a Roman Numeral.", input));
        }

        return input;
    }

}
