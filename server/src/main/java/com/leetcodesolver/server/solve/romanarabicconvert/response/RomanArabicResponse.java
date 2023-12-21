package com.leetcodesolver.server.solve.romanarabicconvert.response;

import com.leetcodesolver.server.responses.SuccessResponse;
import lombok.Data;
import org.springframework.http.HttpStatus;

public class RomanArabicResponse extends SuccessResponse<RomanArabicResponse.RomanIntData> {

    public RomanArabicResponse(RomanIntData data) {
        super(data, HttpStatus.OK.value());
    }

    @Data
    public static class RomanIntData {
        private String romanNumeral;
        private int number;

        public RomanIntData(String rn, int num) {
            romanNumeral = rn;
            number = num;
        }
    }
}
