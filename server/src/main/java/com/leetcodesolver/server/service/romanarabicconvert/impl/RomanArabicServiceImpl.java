package com.leetcodesolver.server.service.romanarabicconvert.impl;

import com.leetcodesolver.server.dto.romanarabicconvert.RomanArabicResponse;
import com.leetcodesolver.server.dto.romanarabicconvert.RomanArabicResponse.RomanArabicData;
import com.leetcodesolver.server.repository.romanarabicconvert.RomanArabicDAOService;
import com.leetcodesolver.server.service.romanarabicconvert.RomanArabicService;
import com.leetcodesolver.server.utility.romanarabicconvert.RomanArabicConvert;
import com.leetcodesolver.server.utility.romanarabicconvert.RomanArabicInput;
import com.leetcodesolver.server.utility.romanarabicconvert.RomanArabicValidate;
import org.springframework.stereotype.Service;

@Service
public class RomanArabicServiceImpl implements RomanArabicService {
    private final RomanArabicDAOService daoService;

    public RomanArabicServiceImpl(RomanArabicDAOService daoService) {
        this.daoService = daoService;
    }

    @Override
    public void clearCache() {
        daoService.deleteAll();
    }

    @Override
    public RomanArabicResponse convert(String romanOrArabic) {
        return processConversion(new RomanArabicInput(romanOrArabic));
    }

    private RomanArabicResponse processConversion(RomanArabicInput input) {
        RomanArabicValidate.validate(input);

        RomanArabicResponse cached = daoService.checkDatabase(input);
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

        daoService.saveConversion(romanNumeral, arabicNumeral);

        return new RomanArabicResponse(
                new RomanArabicData(
                        romanNumeral,
                        arabicNumeral,
                        false));
    }

}
