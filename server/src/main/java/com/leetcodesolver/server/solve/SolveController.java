package com.leetcodesolver.server.solve;

import com.leetcodesolver.server.annotations.EndpointSummary;
import com.leetcodesolver.server.solve.romanarabicconvert.RomanArabicService;
import com.leetcodesolver.server.solve.romanarabicconvert.response.RomanArabicResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1/leetcode/solve")
@RestController
public class SolveController {

    private RomanArabicService romanArabicService;

    public SolveController(RomanArabicService romanArabicService) {
        this.romanArabicService = romanArabicService;
    }

    @GetMapping("/roman-arabic-convert/{romanOrArabic}")
    @EndpointSummary(name = "Roman-Arabic Conversion", description = "Convert a valid Roman Numeral to an Arabic Numeral, and vice versa")
    public RomanArabicResponse converter(@PathVariable String romanOrArabic) {
        return romanArabicService.convert(romanOrArabic);
    }

    @DeleteMapping("/roman-arabic-convert/cache")
    @EndpointSummary(name = "Flush Roman-Arabic Cache", description = "Clears all cached Roman-Arabic numeral conversions")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void flushRomanArabicCache() {
        romanArabicService.clearCache();
    }

}
