package com.leetcodesolver.server.solve.romanarabicconvert.utility;

import com.leetcodesolver.server.error.InvalidInputException;

import java.util.HashMap;
import java.util.Map;

public class RomanArabicValidate {

    // HELPER FIELDS
    private static String validChars = "IVXLCDM";
    private static int[] numeralValues = { 1, 5, 10, 50, 100, 500, 1000 };
    private static Map<Character, Integer> maxChars = new HashMap<>() {
        {
            put('I', 3);
            put('V', 1);
            put('X', 3);
            put('L', 1);
            put('C', 3);
            put('D', 1);
            put('M', 3);
        }
    };

    // ERROR MESSAGES
    private static String invalidRange = "Arabic integer must be between the ranges: 1 <= number <= 3999.";
    private static String emptyRomanNumeral = "Roman numeral must not be empty.";
    private static String invalidCharacters = "Input must be a number, or a Roman numeral must only contain valid characters: I, V, X, L, C, D, or M.";
    private static String invalidRNCombination = "Invalid Roman numeral combination found.";

    public static void validate(RomanArabicInput input) {
        if (input.isArabicNumeral()) {
            validateArabicNumeral(input.getArabicNumeral());
        } else {
            validateRomanNumeral(input.getRomanNumeral());
        }
    }

    static void validateArabicNumeral(int arabicNumeral) {
        if (arabicNumeral < 1 || arabicNumeral > 3999) {
            throw new InvalidInputException(invalidRange);
        }
    }

    static void validateRomanNumeral(String romanNumeralInput) {
        // Check for no Roman Numeral
        if (romanNumeralInput == null || romanNumeralInput.isEmpty()) {
            throw new InvalidInputException(emptyRomanNumeral);
        }

        String romanNumeral = romanNumeralInput.toUpperCase();

        // Check for invalid Roman Numeral characters
        checkForInvalidChars(romanNumeral);

        int numRepeated = 1;
        boolean subtractiveSeen = false;
        for (int i = 1; i < romanNumeral.length(); i++) {
            char prevChar = romanNumeral.charAt(i - 1);
            char currChar = romanNumeral.charAt(i);

            int valueOfPrevChar = numeralValues[validChars.indexOf(prevChar)];
            int valueOfCurrChar = numeralValues[validChars.indexOf(currChar)];

            numRepeated = checkForSurpassingConsecutiveMaxes(prevChar, currChar, numRepeated);
            checkForTooManySubChars(valueOfPrevChar, valueOfCurrChar, subtractiveSeen, romanNumeral, i);
            checkForInvalidSubCombos(prevChar, valueOfPrevChar, valueOfCurrChar, romanNumeral, i);
        }
    }

    private static void checkForInvalidChars(String romanNumeral) {
        for (char c : romanNumeral.toCharArray()) {
            if (validChars.indexOf(c) == -1) {
                throw new InvalidInputException(invalidCharacters);
            }
        }
    }

    private static int checkForSurpassingConsecutiveMaxes(
            char prevChar,
            char currChar,
            int numRepeated) {

        if (currChar == prevChar) {
            numRepeated++;
            if (numRepeated > maxChars.get(currChar)) {
                throw new InvalidInputException(invalidRNCombination);
            }
        } else {
            numRepeated = 1;
        }

        return numRepeated;
    }

    private static void checkForTooManySubChars(
            int valueOfPrevChar,
            int valueOfCurrChar,
            boolean subtractiveSeen,
            String romanNumeral,
            int index) {

        if (valueOfPrevChar < valueOfCurrChar) {
            if (subtractiveSeen) {
                throw new InvalidInputException(invalidRNCombination);
            }

            subtractiveSeen = true;

            // Check for Special-Case Invalid Subtractive Character: "VX", "LC", etc.
            if (valueOfPrevChar == valueOfCurrChar / 2) {
                throw new InvalidInputException(invalidRNCombination);
            }

            if (romanNumeral.length() >= 3 && index >= 2) {
                char potentialSubChar = romanNumeral.charAt(index - 2);
                int valueOfPotentialSubChar = numeralValues[validChars.indexOf(potentialSubChar)];

                // Check for 2nd Potential Subtractive Character: "IIX", "VIX", etc.
                if (valueOfPotentialSubChar < valueOfCurrChar) {
                    throw new InvalidInputException(invalidRNCombination);
                }
            }
        } else {
            subtractiveSeen = false;
        }
    }

    private static void checkForInvalidSubCombos(
            char prevChar,
            int valueOfPrevChar,
            int valueOfCurrChar,
            String romanNumeral,
            int index) {

        if (valueOfCurrChar >= valueOfPrevChar * 10) {
            if (valueOfCurrChar == valueOfPrevChar * 10) { // IX, etc.
                if (maxChars.get(prevChar) == 1) { // sub char is V, L, D
                    throw new InvalidInputException(invalidRNCombination);
                }

                if (romanNumeral.length() > index + 1) {
                    char nextChar = romanNumeral.charAt(index + 1);
                    int valueOfNextChar = numeralValues[validChars.indexOf(nextChar)];

                    if (valueOfNextChar >= valueOfPrevChar) { // IXX, CMM, etc.
                        throw new InvalidInputException(invalidRNCombination);
                    }
                }
            } else { // Invalid Combinations: IL, IC, etc.
                throw new InvalidInputException(invalidRNCombination);
            }
        }
    }

}