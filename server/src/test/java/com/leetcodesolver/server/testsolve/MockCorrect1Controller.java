package com.leetcodesolver.server.testsolve;

import com.leetcodesolver.server.annotations.LeetCodeSuiteInfo;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/endpoint/1")
@LeetCodeSuiteInfo(name = "Mock Suite 1", shortDescription = "Description 1", longDescription = "Long Description 1")
public class MockCorrect1Controller {
}
