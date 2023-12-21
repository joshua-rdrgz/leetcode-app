package com.leetcodesolver.server.problems.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProblemsDTO {

    private final String status;
    private final int statusCode;
    private List<ProblemData> data;

    @Data
    public static class ProblemData {
        private final String endpoint;
        private final String name;
        private final String description;
    }
}
