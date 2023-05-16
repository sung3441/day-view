package com.side.dayv;

import com.side.dayv.oauth.config.properties.AppProperties;
import com.side.dayv.oauth.config.properties.CorsProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
		CorsProperties.class,
		AppProperties.class
})
public class DayViewApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(DayViewApiApplication.class, args);
	}

}
