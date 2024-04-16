package com.leetcodesolver.server.service.romanarabicconvert;

import com.leetcodesolver.server.dto.romanarabicconvert.RomanArabicResponse;

public interface RomanArabicService {
    void clearCache();

    RomanArabicResponse convert(String romanOrArabic);
}