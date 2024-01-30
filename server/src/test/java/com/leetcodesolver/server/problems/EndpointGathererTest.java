package com.leetcodesolver.server.problems;

import com.leetcodesolver.server.annotations.EndpointSummary;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.lang.reflect.Method;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@ActiveProfiles("test")
class EndpointGathererTest {

    @RequestMapping("/base")
    static class TestController {
        @GetMapping("/get")
        @EndpointSummary(name = "Test Get", description = "A GET test endpoint")
        public void testGet() {
        }

        @PostMapping("/post")
        @EndpointSummary(name = "Test Post", description = "A POST test endpoint")
        public void testPost() {
        }

        @PutMapping("/put")
        @EndpointSummary(name = "Test Put", description = "A PUT test endpoint")
        public void testPut() {
        }

        @DeleteMapping("/delete")
        @EndpointSummary(name = "Test Delete", description = "A DELETE test endpoint")
        public void testDelete() {
        }
    }

    private static EndpointsResponse endpoints = EndpointGatherer.getAvailableEndpoints(new TestController());

    @Test
    void getBasePath_returnsBasePath() {
        String basePath = EndpointGatherer.getBasePath(TestController.class);
        assertEquals("/base", basePath);
    }

    private static Stream<Object[]> methodPaths() {
        try {
            return Stream.of(
                    new Object[] { TestController.class.getMethod("testGet"), "/get" },
                    new Object[] { TestController.class.getMethod("testPost"), "/post" },
                    new Object[] { TestController.class.getMethod("testPut"), "/put" },
                    new Object[] { TestController.class.getMethod("testDelete"), "/delete" });
        } catch (NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
    }

    @ParameterizedTest
    @MethodSource("methodPaths")
    void getMethodPath_returnsMethodPath(Method method, String expected) {
        assertEquals(expected, EndpointGatherer.getMethodPath(method));
    }

    private static Stream<Object[]> httpMethods() {
        try {
            return Stream.of(
                    new Object[] { TestController.class.getMethod("testGet"), "GET" },
                    new Object[] { TestController.class.getMethod("testPost"), "POST" },
                    new Object[] { TestController.class.getMethod("testPut"), "PUT" },
                    new Object[] { TestController.class.getMethod("testDelete"), "DELETE" });
        } catch (NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
    }

    @ParameterizedTest
    @MethodSource("httpMethods")
    void getHttpMethod_returnsHttpMethod(Method method, String expected) {
        assertEquals(expected, EndpointGatherer.getHttpMethod(method));
    }

    private static Stream<Object[]> buildEndpointParams() {
        try {
            return Stream.of(
                    new Object[] { TestController.class.getMethod("testGet"), "GET /base/get" },
                    new Object[] { TestController.class.getMethod("testPost"), "POST /base/post" },
                    new Object[] { TestController.class.getMethod("testPut"), "PUT /base/put" },
                    new Object[] { TestController.class.getMethod("testDelete"), "DELETE /base/delete" });
        } catch (NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
    }

    @ParameterizedTest
    @MethodSource("buildEndpointParams")
    void buildEndpoint_returnsFullEndpoint(Method method, String expected) {
        assertEquals(expected,
                EndpointGatherer.buildEndpoint(TestController.class, method));
    }

    private static Stream<Object[]> getAvailableEndpointsData() {
        return Stream.of(
                new Object[] { 0, "Test Get", "A GET test endpoint", "GET /base/get" },
                new Object[] { 1, "Test Post", "A POST test endpoint", "POST /base/post" },
                new Object[] { 2, "Test Put", "A PUT test endpoint", "PUT /base/put" },
                new Object[] { 3, "Test Delete", "A DELETE test endpoint", "DELETE /base/delete" });
    }

    @ParameterizedTest
    @MethodSource("getAvailableEndpointsData")
    void getAvailableEndpoints_returnsCorrectData(int index, String name, String description, String endpoint) {
        assertEquals(name, endpoints.getData().get(index).getName());
        assertEquals(description, endpoints.getData().get(index).getDescription());
        assertEquals(endpoint, endpoints.getData().get(index).getEndpoint());
    }

    @Test
    void getAvailableEndpoints_returnsEmptyList_whenNoEndpoints() {
        @RequestMapping("/base")
        class TestControllerNoMethods {
        }

        EndpointsResponse endpoints = EndpointGatherer.getAvailableEndpoints(new TestControllerNoMethods());

        assertTrue(endpoints.getData().isEmpty());
    }

}
