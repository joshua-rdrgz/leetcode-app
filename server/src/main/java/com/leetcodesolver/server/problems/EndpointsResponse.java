package com.leetcodesolver.server.problems;

import com.leetcodesolver.server.responses.SuccessResponse;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.List;

public class EndpointsResponse
        extends SuccessResponse<List<EndpointsResponse.EndpointsData>> {

    public EndpointsResponse(List<EndpointsData> data) {
        super(data, HttpStatus.OK.value());
    }

    @Data
    public static class EndpointsData {

        private String name;
        private String description;
        private String endpoint;

        public EndpointsData(String name, String description, String endpoint) {
            this.name = name;
            this.description = description;
            this.endpoint = endpoint;
        }

    }

}
