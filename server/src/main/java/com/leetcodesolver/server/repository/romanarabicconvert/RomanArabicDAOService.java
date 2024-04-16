package com.leetcodesolver.server.repository.romanarabicconvert;

import com.leetcodesolver.server.dto.romanarabicconvert.RomanArabicResponse;
import com.leetcodesolver.server.utility.romanarabicconvert.RomanArabicInput;

public interface RomanArabicDAOService {
    void deleteAll();

    void saveConversion(String romanNumeral, int number);

    RomanArabicResponse checkDatabase(RomanArabicInput input);
}