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
        if (RomanArabicValidate.isArabicNumeral(romanOrArabic)) {
            return processConversion(Integer.parseInt(romanOrArabic), true);
        } else {
            return processConversion(romanOrArabic, false);
        }
    }

    private RomanArabicResponse processConversion(Object input, boolean isArabic) {
        RomanArabicValidate.validate(input, isArabic);

        RomanArabicResponse cached = RomanArabicDAOService.checkDatabase(input, isArabic);
        if (cached != null) {
            System.out.println("Found conversion in database!");
            return cached;
        }

        return convertSaveAndReturn(input, isArabic);
    }

    private RomanArabicResponse convertSaveAndReturn(Object input, boolean isArabic) {
        System.out.println("Didn't find conversion in database, converting....");
        Object converted = RomanArabicConvert.convert(input, isArabic);

        if (isArabic) {
            RomanArabicDAOService.saveConversion((String) converted, (int) input);

            return new RomanArabicResponse(
                    new RomanArabicData(
                            converted.toString(),
                            Integer.parseInt(input.toString()),
                            false));
        } else {
            RomanArabicDAOService.saveConversion((String) input, (int) converted);

            return new RomanArabicResponse(
                    new RomanArabicData(
                            input.toString(),
                            Integer.parseInt(converted.toString()),
                            false));
        }
    }
}
