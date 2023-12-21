package com.leetcodesolver.server.solve.romanarabicconvert.response;

import com.leetcodesolver.server.responses.SuccessResponse;
import lombok.Data;
import org.springframework.http.HttpStatus;

public class RomanArabicResponse
        extends SuccessResponse<RomanArabicResponse.RomanArabicData> {

    public RomanArabicResponse(RomanArabicData data) {
        super(data, HttpStatus.OK.value());
    }

    @Data
    public static class RomanArabicData {
        private String romanNumeral;
        private int number;

        public RomanArabicData(String rn, int num) {
            romanNumeral = rn;
            number = num;
        }
    }
}
