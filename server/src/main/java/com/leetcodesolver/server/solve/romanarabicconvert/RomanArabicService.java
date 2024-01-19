package com.leetcodesolver.server.solve.romanarabicconvert;

import com.leetcodesolver.server.solve.romanarabicconvert.dao.RomanArabicDAOService;
import com.leetcodesolver.server.solve.romanarabicconvert.response.RomanArabicResponse;
import com.leetcodesolver.server.solve.romanarabicconvert.response.RomanArabicResponse.RomanArabicData;
import com.leetcodesolver.server.solve.romanarabicconvert.utility.RomanArabicConvert;
import com.leetcodesolver.server.solve.romanarabicconvert.utility.RomanArabicInput;
import com.leetcodesolver.server.solve.romanarabicconvert.utility.RomanArabicValidate;
import org.springframework.stereotype.Service;

@Service
public class RomanArabicService {

    public void clearCache() {
        RomanArabicDAOService.deleteAll();
    }

    public RomanArabicResponse convert(String romanOrArabic) {
        return processConversion(new RomanArabicInput(romanOrArabic));
    }

    private RomanArabicResponse processConversion(RomanArabicInput input) {
        RomanArabicValidate.validate(input);

        RomanArabicResponse cached = RomanArabicDAOService.checkDatabase(input);
        if (cached != null) {
            return cached;
        }

        return convertSaveAndReturn(input);
    }

    private RomanArabicResponse convertSaveAndReturn(RomanArabicInput input) {
        Object converted = RomanArabicConvert.convert(input);
        String romanNumeral;
        int arabicNumeral;

        if (input.isArabicNumeral()) {
            romanNumeral = (String) converted;
            arabicNumeral = input.getArabicNumeral();
        } else {
            romanNumeral = input.getRomanNumeral();
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
