package com.akkena.hyperion;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
@SpringBootApplication
@EnableAsync
public class HyperionApplication {
    public static void main(String[] args) {
        SpringApplication.run(HyperionApplication.class, args);
    }
}
