package com.leetcodesolver.server.suites;

import com.leetcodesolver.server.suites.SuitesController;
import com.leetcodesolver.server.suites.SuitesResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@ActiveProfiles("test")
public class ProblemsControllerTest {

    private SuitesController problemsController;

    private static String TEST_SOLVE_PACKAGE = "com.leetcodesolver.server.testsolve";

    @BeforeEach
    public void setUp() {
        problemsController = new SuitesController();
        problemsController.SOLVE_PACKAGE = TEST_SOLVE_PACKAGE;
    }

    @Test
    public void testGetLeetCodeSuites_ReturnsSuccessResponse() {
        SuitesResponse response = problemsController.getLeetCodeSuites();
        assertEquals(HttpStatus.OK.value(), response.getStatusCode());
    }

    @Test
    public void testGetLeetCodeSuites_ReturnsProblemsData() {
        SuitesResponse response = problemsController.getLeetCodeSuites();
        assertNotNull(response.getData());
        assertEquals("Mock Suite 1", response.getData().get(0).getName());
        assertEquals("Mock Suite 2", response.getData().get(1).getName());
    }

    @Test
    public void testGetLeetCodeSuites_FiltersOutNonControllersAndNonSolvePackages() {
        SuitesResponse response = problemsController.getLeetCodeSuites();
        assertEquals(2, response.getData().size());
    }
}