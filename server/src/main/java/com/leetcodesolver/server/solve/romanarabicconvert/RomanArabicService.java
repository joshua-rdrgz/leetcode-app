package com.leetcodesolver.server.solve.romanarabicconvert;

import com.leetcodesolver.server.error.InvalidInputException;
import com.leetcodesolver.server.solve.romanarabicconvert.dao.RomanArabicDAOService;
import com.leetcodesolver.server.solve.romanarabicconvert.response.RomanArabicResponse;
import com.leetcodesolver.server.solve.romanarabicconvert.response.RomanArabicResponse.RomanIntData;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.regex.Pattern;

@Service
public class RomanArabicService {

    public RomanArabicResponse convert(String romanOrArabic) {
        if (isArabicNumeral(romanOrArabic)) {
            int arabicNumeral = Integer.parseInt(romanOrArabic);

            validateArabicNumeral(arabicNumeral);

            RomanArabicResponse cached = RomanArabicDAOService.checkDatabase(arabicNumeral);
            if (cached != null) {
                System.out.println("Found arabic numeral in database!");
                return cached;
            }

            System.out.println("Didn't find arabic numeral in database, converting....");
            String convertedRN = toRomanNumeral(arabicNumeral);

            RomanArabicDAOService.saveConversion(convertedRN, arabicNumeral);

            return new RomanArabicResponse(
                    new RomanIntData(convertedRN, arabicNumeral));
        }

        String romanNumeral = romanOrArabic;

        validateRomanNumeral(romanNumeral);

        RomanArabicResponse cached = RomanArabicDAOService.checkDatabase(romanNumeral);
        if (cached != null) {
            System.out.println("Found roman numeral in database!");
            return cached;
        }

        System.out.println("Didn't find roman numeral in database, converting....");
        int convertedAN = toArabicNumber(romanNumeral);
        RomanArabicDAOService.saveConversion(romanNumeral, convertedAN);
        return new RomanArabicResponse(
                new RomanIntData(romanNumeral, convertedAN));
    }

    private boolean isArabicNumeral(String romanOrArabic) {
        try {
            Integer.parseInt(romanOrArabic);
            return true;
        } catch (NumberFormatException exception) {
            return false;
        }
    }

    private static void validateArabicNumeral(int arabicNumeral) {
        if (arabicNumeral < 1 || arabicNumeral > 3999) {
            throw new InvalidInputException("Arabic integer must be between the ranges: 1 <= number <= 3999.");
        }
    }

    private static void validateRomanNumeral(String romanNumeral) {
        if (VALID_RN_REGEX.matcher(romanNumeral).matches()) {
            throw new InvalidInputException("Roman Numeral must be valid.");
        }
    }

    private int toArabicNumber(String originalRomanNumeral) {
        String romanNumeral = originalRomanNumeral;
        int arabicNumeral = 0;

        for (Map.Entry<String, Integer> entry : ROMAN_ARABIC_MAP.entrySet()) {
            while (romanNumeral.startsWith(entry.getKey())) {
                arabicNumeral += entry.getValue();
                romanNumeral = romanNumeral.substring(entry.getKey().length());
            }
        }

        return arabicNumeral;
    }

    private String toRomanNumeral(int originalArabicNumeral) {
        int arabicNumeral = originalArabicNumeral;
        StringBuilder romanNumeral = new StringBuilder();

        for (Map.Entry<String, Integer> entry : ROMAN_ARABIC_MAP.entrySet()) {
            while (arabicNumeral >= entry.getValue()) {
                arabicNumeral -= entry.getValue();
                romanNumeral.append(entry.getKey());
            }
        }

        return romanNumeral.toString();
    }

    private static final Pattern VALID_RN_REGEX = Pattern
            .compile("^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$");

    private static final Map<String, Integer> ROMAN_ARABIC_MAP = new LinkedHashMap<>() {
        {
            put("M", 1000);
            put("CM", 900);
            put("D", 500);
            put("CD", 400);
            put("C", 100);
            put("XC", 90);
            put("L", 50);
            put("XL", 40);
            put("X", 10);
            put("IX", 9);
            put("V", 5);
            put("IV", 4);
            put("I", 1);
        }
    };
}
