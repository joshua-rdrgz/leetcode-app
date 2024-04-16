package com.leetcodesolver.server.service.endpoints;

import com.leetcodesolver.server.dto.endpoints.EndpointsResponse;

public interface EndpointService {
    EndpointsResponse getAvailableEndpoints(Object controller);
}