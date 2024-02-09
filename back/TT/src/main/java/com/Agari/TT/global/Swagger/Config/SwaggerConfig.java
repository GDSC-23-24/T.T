package com.Agari.TT.global.Swagger.Config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@OpenAPIDefinition(
        info = @Info(title = "User-Service API 명세서",
                description = "admin :  \n\n\n\n\n\n" +
                        "user : eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjb3RtZHdsIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MDc0ODk0NjYsImV4cCI6MTcxMjY3MzQ2Nn0.4P962DtacjFPZjmMj4RFkMIddBqYDUShO0LMdiFNTa0",
                version = "v1"
        )
)
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI(){
        SecurityScheme securityScheme = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")
                .in(SecurityScheme.In.HEADER).name("Authorization");
        SecurityRequirement securityRequirement = new SecurityRequirement().addList("bearerAuth");

        return new OpenAPI()
                .components(new Components().addSecuritySchemes("bearerAuth", securityScheme))
                .security(Arrays.asList(securityRequirement));
    }
}