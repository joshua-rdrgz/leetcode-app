package com.leetcodesolver.server.problems;

import com.leetcodesolver.server.annotations.EndpointSummary;
import com.leetcodesolver.server.problems.dto.ProblemsDTO;
import com.leetcodesolver.server.solve.SolveController;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/leetcode/problems")
public class ProblemController {

    private final RequestMappingHandlerMapping handlerMapping;

    public ProblemController(ApplicationContext applicationContext,
            @Qualifier("requestMappingHandlerMapping") RequestMappingHandlerMapping handlerMapping) {
        this.handlerMapping = handlerMapping;
    }

    @GetMapping
    private ProblemsDTO scanEndpoints() {
        Map<RequestMappingInfo, HandlerMethod> handlerMethods = handlerMapping.getHandlerMethods();
        List<ProblemsDTO.ProblemData> endpoints = new ArrayList<>();

        for (Map.Entry<RequestMappingInfo, HandlerMethod> entry : handlerMethods.entrySet()) {
            RequestMappingInfo mappingInfo = entry.getKey();
            HandlerMethod handlerMethod = entry.getValue();

            if (handlerMethod.getBeanType().equals(SolveController.class)) {
                EndpointSummary metadata = handlerMethod.getMethodAnnotation(EndpointSummary.class);
                Set<String> patternsCondition = mappingInfo.getPatternValues();
                System.out.println("Route from SolveController:");
                for (String pattern : patternsCondition) {
                    System.out.println("- " + pattern);
                    endpoints.add(new ProblemsDTO.ProblemData(
                            pattern,
                            metadata != null ? metadata.name() : null,
                            metadata != null ? metadata.description() : null));
                }
            }
        }

        ProblemsDTO response = new ProblemsDTO("success", 200);
        response.setData(endpoints);

        return response;
    }

}
