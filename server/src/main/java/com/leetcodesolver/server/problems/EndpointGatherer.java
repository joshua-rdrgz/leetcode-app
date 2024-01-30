package com.leetcodesolver.server.problems;

import com.leetcodesolver.server.annotations.EndpointSummary;
import com.leetcodesolver.server.problems.EndpointsResponse.EndpointsData;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

public class EndpointGatherer {

    public static EndpointsResponse getAvailableEndpoints(Object controller) {
        List<EndpointsData> endpointsData = new ArrayList<>();

        Class<?> controllerClass = controller.getClass();
        Method[] methods = controllerClass.getDeclaredMethods();

        for (Method method : methods) {
            if (method.isAnnotationPresent(EndpointSummary.class)) {
                EndpointSummary annotation = method.getAnnotation(EndpointSummary.class);
                String name = annotation.name();
                String description = annotation.description();

                String endpoint = buildEndpoint(controllerClass, method);

                endpointsData.add(new EndpointsData(name, description, endpoint));
            }
        }

        return new EndpointsResponse(endpointsData);
    }

    static String buildEndpoint(Class<?> controllerClass, Method method) {
        String basePath = getBasePath(controllerClass);
        String methodPath = getMethodPath(method);
        String httpMethod = getHttpMethod(method);

        return httpMethod + " " + basePath + methodPath;
    }

    static String getHttpMethod(Method method) {
        if (method.isAnnotationPresent(GetMapping.class)) {
            return "GET";
        } else if (method.isAnnotationPresent(PostMapping.class)) {
            return "POST";
        } else if (method.isAnnotationPresent(PutMapping.class)) {
            return "PUT";
        } else if (method.isAnnotationPresent(DeleteMapping.class)) {
            return "DELETE";
        }
        return null;
    }

    static String getMethodPath(Method method) {
        if (method.isAnnotationPresent(GetMapping.class)) {
            return method.getAnnotation(GetMapping.class).value()[0];
        } else if (method.isAnnotationPresent(PostMapping.class)) {
            return method.getAnnotation(PostMapping.class).value()[0];
        } else if (method.isAnnotationPresent(PutMapping.class)) {
            return method.getAnnotation(PutMapping.class).value()[0];
        } else if (method.isAnnotationPresent(DeleteMapping.class)) {
            return method.getAnnotation(DeleteMapping.class).value()[0];
        }
        return "";
    }

    static String getBasePath(Class<?> controllerClass) {
        RequestMapping classRequestMapping = controllerClass.getAnnotation(RequestMapping.class);
        return classRequestMapping.value()[0];
    }

}