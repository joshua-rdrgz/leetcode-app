package com.leetcodesolver.server.responses;

public class SuccessResponse<T> extends BaseResponse<T> {

    public SuccessResponse(T data, int statusCode) {
        super("success", statusCode, data);
    }

}
