package com.leetcodesolver.server.responses;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ErrorResponse extends BaseResponse<Void> {

    private final String message;
    private final long timestamp;

    public ErrorResponse(String message, int statusCode) {
        super("error", statusCode, null);
        this.message = message;
        this.timestamp = System.currentTimeMillis();
    }

}
