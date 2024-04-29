package com.leetcodesolver.server.service.sudokusolver;

import org.springframework.stereotype.Service;

@Service
public class SudokuSolverService {

    public char[][] solve(char[][] board) {
        if (solveSudoku(board)) {
            printBoard(board);
            return board;
        } else {
            return new char[9][9];
        }
    }

    private boolean solveSudoku(char[][] board) {
        int[] cell = findEmptyCell(board);
        int row = cell[0];
        int col = cell[1];

        // Base case: If no empty cell is found, the puzzle is solved
        if (row == -1 && col == -1) {
            return true;
        }

        // Recursive case: Try placing numbers from '1' to '9' in the empty cell
        for (char num = '1'; num <= '9'; num++) {
            if (isValid(board, row, col, num)) {
                board[row][col] = num;

                // Recursively solve the remaining puzzle
                if (solveSudoku(board)) {
                    return true;
                } else {
                    // Backtrack: If the current number doesn't lead to a solution,
                    // reset the cell and try the next number
                    board[row][col] = '.';
                }
            }
        }

        // If no number leads to a solution, return false to trigger backtracking
        return false;
    }

    private boolean isValid(char[][] board, int row, int col, char num) {
        // Check if the number conflicts with any value in the same row
        for (int i = 0; i < 9; i++) {
            if (board[row][i] == num) {
                return false;
            }
        }

        // Check if the number conflicts with any value in the same column
        for (int i = 0; i < 9; i++) {
            if (board[i][col] == num) {
                return false;
            }
        }

        // Check if the number conflicts with any value in the same 3x3 subgrid
        int gridRow = (row / 3) * 3;
        int gridCol = (col / 3) * 3;
        for (int i = gridRow; i < gridRow + 3; i++) {
            for (int j = gridCol; j < gridCol + 3; j++) {
                if (board[i][j] == num) {
                    return false;
                }
            }
        }

        // If no conflict is found, the number is valid
        return true;
    }

    private int[] findEmptyCell(char[][] board) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (board[row][col] == '.' || board[row][col] == '0') {
                    return new int[] { row, col };
                }
            }
        }
        // If no empty cell is found, return (-1, -1)
        return new int[] { -1, -1 };
    }

    private void printBoard(char[][] board) {
        System.out.println("BOARD: ");
        for (char[] row : board) {
            for (char character : row) {
                System.out.print(character);
            }
            System.out.println();
        }
    }

}