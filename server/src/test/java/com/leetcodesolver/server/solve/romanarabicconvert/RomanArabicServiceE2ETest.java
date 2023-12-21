package com.leetcodesolver.server.solve.romanarabicconvert;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.isA;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class RomanArabicServiceE2ETest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void convert_validArabicNumber_returnsRomanNumeral() throws Exception {
        mockMvc.perform(get("/api/v1/leetcode/solve/roman-arabic-convert/1234"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        "{\"status\":\"success\",\"statusCode\":200,\"data\":{\"romanNumeral\":\"MCCXXXIV\",\"number\":1234}}"));
    }

    @Test
    public void convert_validRomanNumeral_returnsArabicNumber() throws Exception {
        mockMvc.perform(get("/api/v1/leetcode/solve/roman-arabic-convert/MMXXIII"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        "{\"status\":\"success\",\"statusCode\":200,\"data\":{\"romanNumeral\":\"MMXXIII\",\"number\":2023}}"));
    }

    @Test
    public void convert_invalidArabicNumber_returnsErrorResponse() throws Exception {
        mockMvc.perform(get("/api/v1/leetcode/solve/roman-arabic-convert/0"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath(
                        "$.status",
                        containsString("error")))
                .andExpect(jsonPath(
                        "$.statusCode",
                        equalTo(400)))
                .andExpect(jsonPath(
                        "$.message",
                        containsString("Arabic integer must be between the ranges: 1 <= number <= 3999.")))
                .andExpect(jsonPath(
                        "$.timestamp",
                        isA(Long.class)));
    }

    @Test
    public void convert_invalidRomanNumeral_returnsErrorResponse() throws Exception {
        mockMvc.perform(get("/api/v1/leetcode/solve/roman-arabic-convert/IIII"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath(
                        "$.status",
                        containsString("error")))
                .andExpect(jsonPath(
                        "$.statusCode",
                        equalTo(400)))
                .andExpect(jsonPath(
                        "$.message",
                        containsString("Invalid Roman numeral combination found.")))
                .andExpect(jsonPath(
                        "$.timestamp",
                        isA(Long.class)));
    }

    @Test
    public void convert_nonNumericInput_returnsErrorResponse() throws Exception {
        mockMvc.perform(get("/api/v1/leetcode/solve/roman-arabic-convert/abc"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath(
                        "$.status",
                        containsString("error")))
                .andExpect(jsonPath(
                        "$.statusCode",
                        equalTo(400)))
                .andExpect(jsonPath(
                        "$.message",
                        containsString(
                                "Input must be a number, or a Roman numeral must only contain valid characters: I, V, X, L, C, D, or M.")))
                .andExpect(jsonPath(
                        "$.timestamp",
                        isA(Long.class)));
    }

}
