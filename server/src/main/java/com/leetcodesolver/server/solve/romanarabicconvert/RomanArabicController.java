package com.leetcodesolver.server.solve.romanarabicconvert;

import com.leetcodesolver.server.annotations.EndpointSummary;
import com.leetcodesolver.server.annotations.LeetCodeSuiteInfo;
import com.leetcodesolver.server.problems.EndpointsResponse;
import com.leetcodesolver.server.solve.romanarabicconvert.response.RomanArabicResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/leetcode/solve/roman-arabic-convert")
@LeetCodeSuiteInfo(name = "Roman/Arabic Numeral Converter", shortDescription = "Convert between Roman and Arabic numerals easily.", longDescription = "This LeetCode suite provides utilities for converting between Roman and Arabic numerals.  It utilizes a database that serves as a cache, allowing for optimal performance in the case of requests that have been asked before.", endpoint = "/api/v1/roman-arabic-convert")
public class RomanArabicController {

    private RomanArabicService romanArabicService;

    public RomanArabicController(RomanArabicService romanArabicService) {
        this.romanArabicService = romanArabicService;
    }

    @GetMapping
    public EndpointsResponse getAvailableEndpoints() {
        List<EndpointsResponse.EndpointsData> endpointsData = new ArrayList<>();

        Method[] methods = RomanArabicController.class.getDeclaredMethods();

        for (Method method : methods) {
            if (method.getName().equals("getAvailableEndpoints")) {
                continue;
            }

            if (method.isAnnotationPresent(EndpointSummary.class)) {
                EndpointSummary annotation = method.getAnnotation(EndpointSummary.class);
                String name = annotation.name();
                String description = annotation.description();

                String httpMethod = null;
                String methodPath = "";

                // Combined block for identifying HTTP methods
                if (method.isAnnotationPresent(GetMapping.class)) {
                    httpMethod = "GET";
                    methodPath = method.getAnnotation(GetMapping.class).value()[0];
                } else if (method.isAnnotationPresent(PostMapping.class)) {
                    httpMethod = "POST";
                    methodPath = method.getAnnotation(PostMapping.class).value()[0];
                } else if (method.isAnnotationPresent(PutMapping.class)) {
                    httpMethod = "PUT";
                    methodPath = method.getAnnotation(PutMapping.class).value()[0];
                } else if (method.isAnnotationPresent(DeleteMapping.class)) {
                    httpMethod = "DELETE";
                    methodPath = method.getAnnotation(DeleteMapping.class).value()[0];
                }

                if (httpMethod != null) { // Ensure an HTTP method was found
                    RequestMapping classRequestMapping = RomanArabicController.class
                            .getAnnotation(RequestMapping.class);
                    String basePath = classRequestMapping.value()[0];
                    String endpoint = basePath + methodPath;
                    endpointsData
                            .add(new EndpointsResponse.EndpointsData(name, description, httpMethod + " " + endpoint));
                }
            }
        }

        return new EndpointsResponse(endpointsData);
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
