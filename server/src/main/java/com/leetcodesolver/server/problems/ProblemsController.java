package com.leetcodesolver.server.problems;

import com.leetcodesolver.server.annotations.LeetCodeSuiteInfo;
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
@RequestMapping("/api/v1/leetcode/problems")
public class ProblemsController {

    private static final String SOLVE_PACKAGE = "com.leetcodesolver.server.solve";

    @GetMapping
    public ProblemsResponse getLeetCodeSuites() {
        List<ProblemsResponse.ProblemsData> problemsData = new ArrayList<>();

        Reflections reflections = new Reflections(new ConfigurationBuilder()
                .setUrls(ClasspathHelper.forPackage(SOLVE_PACKAGE))
                .setScanners(Scanners.SubTypes, Scanners.TypesAnnotated));

        Set<Class<?>> controllerClasses = reflections.getTypesAnnotatedWith(LeetCodeSuiteInfo.class);
        for (Class<?> controllerClass : controllerClasses) {
            if (!controllerClass.getName().endsWith("Controller") ||
                    !controllerClass.getPackage().getName().startsWith(SOLVE_PACKAGE)) {
                continue;
            }

            LeetCodeSuiteInfo suiteInfo = controllerClass.getAnnotation(LeetCodeSuiteInfo.class);

            problemsData.add(new ProblemsResponse.ProblemsData(
                    suiteInfo.name(),
                    suiteInfo.shortDescription(),
                    suiteInfo.longDescription(),
                    suiteInfo.endpoint()));
        }

        return new ProblemsResponse(problemsData);
    }

}
