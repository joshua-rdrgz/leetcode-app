package com.leetcodesolver.server.dto.sudokusolver;

import com.leetcodesolver.server.dto.base.SuccessResponse;

public class SudokuSolverResponse extends SuccessResponse<char[][]> {

    public SudokuSolverResponse(char[][] data, int statusCode) {
        super(data, statusCode);
    }

}
