package com.leetcodesolver.server.dto.suites;

import com.leetcodesolver.server.dto.base.SuccessResponse;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.List;

public class SuitesResponse
        extends SuccessResponse<List<SuitesResponse.SuitesData>> {

    public SuitesResponse(List<SuitesData> data) {
        super(data, HttpStatus.OK.value());
    }

    @Data
    public static class SuitesData {

        private String name;
        private String shortDescription;
        private String longDescription;
        private String endpoint;

        public SuitesData(
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
