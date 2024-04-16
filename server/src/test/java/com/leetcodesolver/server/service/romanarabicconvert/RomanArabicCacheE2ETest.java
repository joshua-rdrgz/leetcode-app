package com.leetcodesolver.server.service.romanarabicconvert;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class RomanArabicCacheE2ETest {

    @Autowired
    private MockMvc mockMvc;

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
        mockMvc.perform(delete("/api/v1/leetcode/solve/roman-arabic-convert/cache"));

        // 4) Verify the conversion is not found in the cache after the deletion
        mockMvc.perform(get("/api/v1/leetcode/solve/roman-arabic-convert/123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.foundInDB", equalTo(false)));
    }

    @Test
    public void conversion_requestCacheBehavior_returnsCorrectValues() throws Exception {
        // 1) Convert Roman to Arabic and get the Arabic result
        mockMvc.perform(get("/api/v1/leetcode/solve/roman-arabic-convert/MMXXII"))
                .andExpect(status().isOk());

        // 2) Convert the Arabic result back to Roman. It should be from cache.
        mockMvc.perform(get("/api/v1/leetcode/solve/roman-arabic-convert/2022"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.foundInDB", equalTo(true)))
                .andExpect(jsonPath("$.data.romanNumeral", equalTo("MMXXII")));
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
