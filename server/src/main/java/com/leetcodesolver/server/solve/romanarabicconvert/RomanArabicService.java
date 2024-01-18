package com.leetcodesolver.server.solve.romanarabicconvert;

import com.leetcodesolver.server.solve.romanarabicconvert.dao.RomanArabicDAOService;
import com.leetcodesolver.server.solve.romanarabicconvert.response.RomanArabicResponse;
import com.leetcodesolver.server.solve.romanarabicconvert.response.RomanArabicResponse.RomanArabicData;
import com.leetcodesolver.server.solve.romanarabicconvert.utility.RomanArabicConvert;
import com.leetcodesolver.server.solve.romanarabicconvert.utility.RomanArabicValidate;
import org.springframework.stereotype.Service;

@Service
public class RomanArabicService {

    public void clearCache() {
        RomanArabicDAOService.deleteAll();
    }

    public RomanArabicResponse convert(String romanOrArabic) {
        return processConversion(
                romanOrArabic,
                RomanArabicValidate.isArabicNumeral(romanOrArabic));
    }

    private RomanArabicResponse processConversion(String input, boolean isArabic) {
        RomanArabicValidate.validate(input, isArabic);

        RomanArabicResponse cached = RomanArabicDAOService.checkDatabase(input, isArabic);
        if (cached != null) {
            return cached;
        }

        return convertSaveAndReturn(input, isArabic);
    }

    private RomanArabicResponse convertSaveAndReturn(String input, boolean isArabic) {
        Object converted = RomanArabicConvert.convert(input, isArabic);
        String romanNumeral;
        int arabicNumeral;

        if (isArabic) {
            romanNumeral = (String) converted;
            arabicNumeral = Integer.parseInt(input);
        } else {
            romanNumeral = input;
            arabicNumeral = (int) converted;
        }

        RomanArabicDAOService.saveConversion(romanNumeral, arabicNumeral);

        return new RomanArabicResponse(
                new RomanArabicData(
                        romanNumeral,
                        arabicNumeral,
                        false));
    }
}
