package com.side.dayv.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.config.PageableHandlerMethodArgumentResolverCustomizer;

@Configuration
public class CommonConfig {

    /**
     * pageable setting
     * page의 기본 값은 0인데 OnIndexed 를 true로 설정하면 1부터 시작함
     */
    @Bean
    public PageableHandlerMethodArgumentResolverCustomizer customize() {
        return p -> p.setOneIndexedParameters(true);
    }
}
