package com.leetcodesolver.server.controller.suites;

import com.leetcodesolver.server.annotations.LeetCodeSuiteInfo;
import com.leetcodesolver.server.dto.suites.SuitesResponse;
import org.reflections.Reflections;
import org.reflections.scanners.Scanners;
import org.reflections.util.ClasspathHelper;
import org.reflections.util.ConfigurationBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/leetcode/suites")
public class SuitesController {

    String SOLVE_PACKAGE = "com.leetcodesolver.server.controller";

    Reflections reflections = new Reflections(new ConfigurationBuilder()
            .setUrls(ClasspathHelper.forPackage(SOLVE_PACKAGE))
            .setScanners(Scanners.SubTypes, Scanners.TypesAnnotated));

    @GetMapping
    public SuitesResponse getLeetCodeSuites() {
        List<SuitesResponse.SuitesData> suitesData = new ArrayList<>();

        Set<Class<?>> controllerClasses = reflections.getTypesAnnotatedWith(LeetCodeSuiteInfo.class);
        for (Class<?> controllerClass : controllerClasses) {
            if (!controllerClass.getName().endsWith("Controller") ||
                    !controllerClass.getPackage().getName().startsWith(SOLVE_PACKAGE)) {
                continue;
            }

            LeetCodeSuiteInfo suiteInfo = controllerClass.getAnnotation(LeetCodeSuiteInfo.class);

            // Look at `@RequestMapping` for endpoint default value
            String endpoint = suiteInfo.endpoint();
            if (endpoint.isEmpty()) {
                RequestMapping requestMapping = controllerClass.getAnnotation(RequestMapping.class);
                endpoint = requestMapping.value()[0];
            }

            suitesData.add(new SuitesResponse.SuitesData(
                    suiteInfo.name(),
                    suiteInfo.shortDescription(),
                    suiteInfo.longDescription(),
                    endpoint));
        }

        return new SuitesResponse(suitesData);
    }

}
