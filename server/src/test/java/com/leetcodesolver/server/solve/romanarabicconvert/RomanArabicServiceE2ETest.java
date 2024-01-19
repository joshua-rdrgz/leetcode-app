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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
                .andExpect(jsonPath("$.status", equalTo("success")))
                .andExpect(jsonPath("$.statusCode", equalTo(200)))
                .andExpect(jsonPath("$.data.romanNumeral", equalTo("MCCXXXIV")))
                .andExpect(jsonPath("$.data.number", equalTo(1234)));
    }

    @Test
    public void convert_validRomanNumeral_returnsArabicNumber() throws Exception {
        mockMvc.perform(get("/api/v1/leetcode/solve/roman-arabic-convert/MMXXIII"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", equalTo("success")))
                .andExpect(jsonPath("$.statusCode", equalTo(200)))
                .andExpect(jsonPath("$.data.romanNumeral", equalTo("MMXXIII")))
                .andExpect(jsonPath("$.data.number", equalTo(2023)));
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

    @Test
    public void conversion_foundInDB_returnsCorrectValue() throws Exception {
        // 1) Make an initial conversion to populate the cache
        mockMvc.perform(get("/api/v1/leetcode/solve/roman-arabic-convert/123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.foundInDB", equalTo(false)));

        // 2) Verify the initial conversion was cached
        mockMvc.perform(get("/api/v1/leetcode/solve/roman-arabic-convert/123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.foundInDB", equalTo(true)));

        // 3) Clear the cache
        mockMvc.perform(delete("/api/v1/leetcode/solve/roman-arabic-convert/cache"))
                .andExpect(status().isNoContent());

        // 4) Verify the conversion is not found in the cache after the deletion
        mockMvc.perform(get("/api/v1/leetcode/solve/roman-arabic-convert/123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.foundInDB", equalTo(false)));
    }

    @Test
    public void flushCache_deletesCachedConversions() throws Exception {
        mockMvc.perform(get("/api/v1/leetcode/solve/roman-arabic-convert/CXXIII"))
                .andExpect(status().isOk());

        // Verify conversion was cached in database
        mockMvc.perform(get("/api/v1/leetcode/solve/roman-arabic-convert/CXXIII"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.foundInDB", equalTo(true)));

        mockMvc.perform(delete("/api/v1/leetcode/solve/roman-arabic-convert/cache"))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/v1/leetcode/solve/roman-arabic-convert/CXXIII"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.foundInDB", equalTo(false)));
    }

}
