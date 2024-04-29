package com.leetcodesolver.server.controller.sudokusolver;

import com.leetcodesolver.server.annotations.EndpointSummary;
import com.leetcodesolver.server.annotations.LeetCodeSuiteInfo;
import com.leetcodesolver.server.dto.endpoints.EndpointsResponse;
import com.leetcodesolver.server.dto.sudokusolver.SudokuSolverResponse;
import com.leetcodesolver.server.service.endpoints.EndpointService;
import com.leetcodesolver.server.service.sudokusolver.SudokuSolverService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/leetcode/solve/sudoku-solver")
@LeetCodeSuiteInfo(name = "Sudoku Solver", shortDescription = "Solves a given Sudoku puzzle", longDescription = "This suite provides an endpoint to solve a Sudoku puzzle guaranteed to have only one solution.")
public class SudokuSolverController {

    private final SudokuSolverService sudokuSolverService;
    private final EndpointService endpointService;

    public SudokuSolverController(SudokuSolverService sudokuSolverService, EndpointService endpointService) {
        this.sudokuSolverService = sudokuSolverService;
        this.endpointService = endpointService;
    }

    @GetMapping
    public EndpointsResponse getAvailableEndpoints() {
        return endpointService.getAvailableEndpoints(this);
    }

    @PostMapping("/solve-puzzle")
    @EndpointSummary(name = "Solve Sudoku", description = "Solves the given Sudoku puzzle")
    public SudokuSolverResponse solveSudoku(@RequestBody char[][] board) {
        char[][] solvedBoard = sudokuSolverService.solve(board);
        return new SudokuSolverResponse(solvedBoard, 200);
    }

}
