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
        private boolean foundInDB;

        public RomanArabicData(String romanNumeral, int number, boolean foundInDB) {
            this.romanNumeral = romanNumeral;
            this.number = number;
            this.foundInDB = foundInDB;
        }

        /**
         * For use when returning cached conversions.
         * 
         * @param romanNumeral
         * @param number
         */
        public RomanArabicData(String romanNumeral, int number) {
            this(romanNumeral, number, true);
        }
    }
}
