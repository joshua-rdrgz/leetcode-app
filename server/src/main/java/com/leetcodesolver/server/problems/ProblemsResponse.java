package com.leetcodesolver.server.problems;

import com.leetcodesolver.server.responses.SuccessResponse;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.List;

public class ProblemsResponse
        extends SuccessResponse<List<ProblemsResponse.ProblemsData>> {

    public ProblemsResponse(List<ProblemsData> data) {
        super(data, HttpStatus.OK.value());
    }

    @Data
    public static class ProblemsData {

        private String name;
        private String shortDescription;
        private String longDescription;
        private String endpoint;

        public ProblemsData(
                String name,
                String shortDescription,
                String longDescription,
                String endpoint) {
            this.name = name;
            this.shortDescription = shortDescription;
            this.longDescription = longDescription;
            this.endpoint = endpoint;
        }

    }

}
