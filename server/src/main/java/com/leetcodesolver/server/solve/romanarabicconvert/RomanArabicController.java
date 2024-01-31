package com.leetcodesolver.server.solve.romanarabicconvert;

import com.leetcodesolver.server.annotations.EndpointSummary;
import com.leetcodesolver.server.annotations.LeetCodeSuiteInfo;
import com.leetcodesolver.server.problems.EndpointGatherer;
import com.leetcodesolver.server.problems.EndpointsResponse;
import com.leetcodesolver.server.solve.romanarabicconvert.response.RomanArabicResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/leetcode/solve/roman-arabic-convert")
@LeetCodeSuiteInfo(name = "Roman/Arabic Numeral Converter", shortDescription = "Convert between Roman and Arabic numerals easily.", longDescription = "This LeetCode suite provides utilities for converting between Roman and Arabic numerals.  It utilizes a database that serves as a cache, allowing for optimal performance in the case of requests that have been asked before.", endpoint = "/api/v1/leetcode/solve/roman-arabic-convert")
public class RomanArabicController {

    private RomanArabicService romanArabicService;

    public RomanArabicController(RomanArabicService romanArabicService) {
        this.romanArabicService = romanArabicService;
    }

    @GetMapping
    public EndpointsResponse getAvailableEndpoints() {
        return EndpointGatherer.getAvailableEndpoints(this);
    }

    @GetMapping("/{romanOrArabic}")
    @EndpointSummary(name = "Roman-Arabic Conversion", description = "Convert a valid Roman Numeral to an Arabic Numeral, and vice versa")
    public RomanArabicResponse converter(@PathVariable String romanOrArabic) {
        return romanArabicService.convert(romanOrArabic);
    }

    @DeleteMapping("/cache")
    @EndpointSummary(name = "Flush Roman-Arabic Cache", description = "Clears all cached Roman-Arabic numeral conversions")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void flushRomanArabicCache() {
        romanArabicService.clearCache();
    }

}
