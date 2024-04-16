package com.leetcodesolver.server.service.romanarabicconvert;

import org.apache.commons.lang3.math.NumberUtils;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class RomanArabicServiceE2ETest {

    @Autowired
    private MockMvc mockMvc;

    @ParameterizedTest
    @CsvSource({
            "1, I",
            "47, XLVII",
            "692, DCXCII",
            "1234, MCCXXXIV",
            "2023, MMXXIII",
            "3999, MMMCMXCIX",
            "III, 3",
            "XIX, 19",
            "XLIX, 49",
            "DLXVII, 567",
            "MDCCCXCIX, 1899",
            "MMXVIII, 2018",
            "MMMCMXCVIII, 3998"
    })
    public void convert_validNumeral_returnsCorrectRepresentation(String input, String output) throws Exception {
        boolean inputIsArabic = NumberUtils.isDigits(input);

        // Parse the Arabic numeral to datatype "int"
        Object given = inputIsArabic ? Integer.parseInt(input) : input;
        Object expected = inputIsArabic ? output : Integer.parseInt(output);

        mockMvc.perform(get("/api/v1/leetcode/solve/roman-arabic-convert/" + input))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", equalTo("success")))
                .andExpect(jsonPath("$.statusCode", equalTo(200)))
                .andExpect(jsonPath("$.data.romanNumeral", equalTo(inputIsArabic ? expected : given)))
                .andExpect(jsonPath("$.data.arabicNumeral", equalTo(inputIsArabic ? given : expected)));
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "-5000", "-189", "-56", "-2", "0", "4000", "10456"
    })
    public void convert_arabicNumeralOutOfRange_returnsErrorResponse(int number) throws Exception {
        mockMvc.perform(get("/api/v1/leetcode/solve/roman-arabic-convert/" + number))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message",
                        containsString("Arabic integer must be between the ranges: 1 <= number <= 3999.")));
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "IIV", "IIX", "VIX",
            "IL", "IC", "ID", "IM",
            "VX", "VL", "VC", "VD", "VM",
            "CCM", "CDM", "CMM",
            "XD", "XM",
            "LC", "LD", "LM", "DM",
            "IIII", "VVVV", "XXXX", "LLLL", "CCCC", "DDDD", "MMMM"
    })
    public void convert_invalidRomanNumeral_returnsErrorResponse(String invalidRoman) throws Exception {
        mockMvc.perform(get("/api/v1/leetcode/solve/roman-arabic-convert/" + invalidRoman))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", containsString("Invalid Roman numeral")));
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "abc", "Invalidinput", "iO9AVC45}", " XI ", "IX V", " 23"
    })
    public void convert_notAllowedCharacter_returnsErrorResponse(String input) throws Exception {
        mockMvc.perform(get("/api/v1/leetcode/solve/roman-arabic-convert/" + input))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath(
                        "$.message",
                        containsString(
                                "Invalid input received: Input must be a number, or a Roman numeral must only contain valid characters: I, V, X, L, C, D, or M.")));
    }

    @ParameterizedTest
    @CsvSource({
            "MMXXII, 2022",
            "mMix, 2009",
            "xIv, 14",
            "cD, 400",
            "ViII, 8"
    })
    public void conversion_isCaseInsensitive_returnsCorrectValue(String mixedCaseRoman, int expectedNumber)
            throws Exception {
        mockMvc.perform(get("/api/v1/leetcode/solve/roman-arabic-convert/" +
                mixedCaseRoman))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.arabicNumeral", equalTo(expectedNumber)))
                .andExpect(jsonPath("$.data.romanNumeral",
                        equalTo(mixedCaseRoman.toUpperCase())));
    }

}
