package com.leetcodesolver.server.solve.romanarabicconvert;

import com.leetcodesolver.server.solve.romanarabicconvert.dao.RomanArabicDAOService;
import com.leetcodesolver.server.solve.romanarabicconvert.response.RomanArabicResponse;
import com.leetcodesolver.server.solve.romanarabicconvert.response.RomanArabicResponse.RomanArabicData;
import com.leetcodesolver.server.solve.romanarabicconvert.utility.RomanArabicConvert;
import com.leetcodesolver.server.solve.romanarabicconvert.utility.RomanArabicValidate;
import org.springframework.stereotype.Service;

@Service
public class RomanArabicService {

    public RomanArabicResponse convert(String romanOrArabic) {
        if (RomanArabicValidate.isArabicNumeral(romanOrArabic)) {
            int arabicNumeral = Integer.parseInt(romanOrArabic);

            RomanArabicValidate.validateArabicNumeral(arabicNumeral);

            RomanArabicResponse cached = RomanArabicDAOService.checkDatabase(arabicNumeral);
            if (cached != null) {
                System.out.println("Found arabic numeral in database!");
                return cached;
            }

            System.out.println("Didn't find arabic numeral in database, converting....");
            String convertedRN = RomanArabicConvert.toRomanNumeral(arabicNumeral);

            RomanArabicDAOService.saveConversion(convertedRN, arabicNumeral);

            return new RomanArabicResponse(
                    new RomanArabicData(convertedRN, arabicNumeral, false));
        }

        String romanNumeral = romanOrArabic;

        RomanArabicValidate.validateRomanNumeral(romanNumeral);

        RomanArabicResponse cached = RomanArabicDAOService.checkDatabase(romanNumeral);
        if (cached != null) {
            System.out.println("Found roman numeral in database!");
            return cached;
        }

        System.out.println("Didn't find roman numeral in database, converting....");
        int convertedAN = RomanArabicConvert.toArabicNumber(romanNumeral);
        RomanArabicDAOService.saveConversion(romanNumeral, convertedAN);
        return new RomanArabicResponse(
                new RomanArabicData(romanNumeral, convertedAN, false));
    }
}
