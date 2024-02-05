package com.leetcodesolver.server.suites;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;

import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@ActiveProfiles("test")
public class SuitesControllerTest {

    private SuitesController suitesController;

    private static String TEST_SOLVE_PACKAGE = "com.leetcodesolver.server.testsolve";

    @BeforeEach
    public void setUp() {
        suitesController = new SuitesController();
        suitesController.SOLVE_PACKAGE = TEST_SOLVE_PACKAGE;
    }

    @Test
    public void testGetLeetCodeSuites_ReturnsSuccessResponse() {
        SuitesResponse response = suitesController.getLeetCodeSuites();
        assertEquals(HttpStatus.OK.value(), response.getStatusCode());
    }

    @Test
    public void testGetLeetCodeSuites_ReturnsSuitesData() {
        SuitesResponse response = suitesController.getLeetCodeSuites();
        assertNotNull(response.getData());
        assertEquals("Mock Suite 1", response.getData().get(0).getName());
        assertEquals("Mock Suite 2", response.getData().get(1).getName());
    }

    @Test
    public void testGetLeetCodeSuites_FiltersOutNonControllersAndNonSolvePackages() {
        SuitesResponse response = suitesController.getLeetCodeSuites();
        assertEquals(2, response.getData().size());
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "/endpoint/1",
            "/endpoint/2"
    })
    public void testGetLeetCodeSuites_DeterminesEndpointFromAnnotations(String expectedEndpoint) {

        SuitesResponse response = suitesController.getLeetCodeSuites();

        int index = response.getData().stream()
                .map(SuitesResponse.SuitesData::getEndpoint)
                .collect(Collectors.toList())
                .indexOf(expectedEndpoint);

        assertEquals(expectedEndpoint, response.getData().get(index).getEndpoint());

    }
}