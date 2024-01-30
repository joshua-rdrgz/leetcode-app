package com.leetcodesolver.server.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface LeetCodeSuiteInfo {
    public String name() default "";

    public String shortDescription() default "";

    public String longDescription() default "";

    public String endpoint() default "";
}
