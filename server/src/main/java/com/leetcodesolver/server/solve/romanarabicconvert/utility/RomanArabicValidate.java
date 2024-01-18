package com.leetcodesolver.server.solve.romanarabicconvert.utility;

import com.leetcodesolver.server.error.InvalidInputException;

public class RomanArabicValidate {
    public static boolean isArabicNumeral(String romanOrArabic) {
        try {
            Integer.parseInt(romanOrArabic);
            return true;
        } catch (NumberFormatException exception) {
            return false;
        }
    }

    public static void validate(String input, boolean isArabic) {
        if (isArabic) {
            int arabicNumeral = Integer.parseInt(input);
            validateData(arabicNumeral);
        } else {
            String romanNumeral = input;
            validateData(romanNumeral);
        }
    }

    static void validateData(int arabicNumeral) {
        if (arabicNumeral < 1 || arabicNumeral > 3999) {
            throw new InvalidInputException("Arabic integer must be between the ranges: 1 <= number <= 3999.");
        }
    }

    static void validateData(String romanNumeralInput) {
        if (romanNumeralInput == null || romanNumeralInput.isEmpty()) {
            throw new InvalidInputException("Roman numeral must not be empty.");
        }

        String romanNumeral = romanNumeralInput.toUpperCase();

        String validChars = "IVXLCDM";

        for (char c : romanNumeral.toCharArray()) {
            if (validChars.indexOf(c) == -1) {
                // Character is not a valid Roman numeral character
                throw new InvalidInputException(
                        "Input must be a number, or a Roman numeral must only contain valid characters: I, V, X, L, C, D, or M.");
            }
        }

        // Check for valid combinations of Roman numeral characters
        if (romanNumeral.contains("IIII") ||
                romanNumeral.contains("VV") ||
                romanNumeral.contains("XXXX") ||
                romanNumeral.contains("LL") ||
                romanNumeral.contains("CCCC") ||
                romanNumeral.contains("DD")) {
            throw new InvalidInputException("Invalid Roman numeral combination found.");
        }

        // Check for valid subtractive combinations
        if (romanNumeral.contains("IL") ||
                romanNumeral.contains("IC") ||
                romanNumeral.contains("ID") ||
                romanNumeral.contains("IM") ||
                romanNumeral.contains("XD") ||
                romanNumeral.contains("XM")) {
            throw new InvalidInputException("Invalid Roman numeral combination found.");
        }

        // Check for valid repetitions of subtractive combinations
        if (romanNumeral.indexOf("CD") != -1 &&
                romanNumeral.indexOf("CD") < romanNumeral.lastIndexOf("C")) {
            throw new InvalidInputException("Invalid Roman numeral combination found.");
        }

        if (romanNumeral.indexOf("CM") != -1 &&
                romanNumeral.indexOf("CM") < romanNumeral.lastIndexOf("C")) {
            throw new InvalidInputException("Invalid Roman numeral combination found.");
        }

        if (romanNumeral.indexOf("XC") != -1 &&
                romanNumeral.indexOf("XC") < romanNumeral.lastIndexOf("X")) {
            throw new InvalidInputException("Invalid Roman numeral combination found.");
        }

        if (romanNumeral.indexOf("XL") != -1 &&
                romanNumeral.indexOf("XL") < romanNumeral.lastIndexOf("X")) {
            throw new InvalidInputException("Invalid Roman numeral combination found.");
        }

        if (romanNumeral.indexOf("IX") != -1 &&
                romanNumeral.indexOf("IX") < romanNumeral.lastIndexOf("I")) {
            throw new InvalidInputException("Invalid Roman numeral combination found.");
        }

        if (romanNumeral.indexOf("IV") != -1 &&
                romanNumeral.indexOf("IV") < romanNumeral.lastIndexOf("I")) {
            throw new InvalidInputException("Invalid Roman numeral combination found.");
        }
    }
}
