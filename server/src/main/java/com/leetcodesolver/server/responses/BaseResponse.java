package com.leetcodesolver.server.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.Data;

@Data
public abstract class BaseResponse<T> {

    private final String status;
    private final int statusCode;

    @JsonInclude(Include.NON_NULL)
    private final T data;

}
