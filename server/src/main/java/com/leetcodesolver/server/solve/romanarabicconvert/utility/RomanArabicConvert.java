package com.leetcodesolver.server.solve.romanarabicconvert.utility;

import java.util.LinkedHashMap;
import java.util.Map;

public class RomanArabicConvert {
    public static Object convert(String input, boolean isArabic) {
        if (isArabic) {
            int arabicNumeral = Integer.parseInt(input);
            return convertData(arabicNumeral);
        } else {
            String romanNumeral = input;
            return convertData(romanNumeral);
        }
    }

    static int convertData(String originalRomanNumeral) {
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

    static String convertData(int originalArabicNumeral) {
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
