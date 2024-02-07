package com.Agari.TT.global.Security.Config;


import com.Agari.TT.global.Jwt.JwtAuthenticationFilter;
import com.Agari.TT.global.Jwt.JwtTokenProvider;
import com.Agari.TT.global.Security.Handler.CustomAccessDeniedHandler;
import com.Agari.TT.global.Security.Handler.CustomAuthenticationEntryPoint;
import com.Agari.TT.global.Security.Service.CustomMemberDetailSerivce;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.UUID;


@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@Slf4j
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;

    /**
     * Spring Security의 앞단 설정을 할수 있다.
     * debug, firewall, ignore등의 설정이 가능
     * 단 여기서 resource에 대한 모든 접근을 허용하는 설정할수도 있는데
     * 그럴경우 SpringSecuity에서 접근을 통제하는 설정은 무시해버린다.
     */

    /**
     * Spring Security 기능 설정을 할수 있다.
     * 특정 리소스에 접근하지 못하게 하거나 반대로 로그인, 회원가입 페이지외에 인증정보가 있어야
     * 접근할 수 있도록 설정할 수 있다.
     * 특정 리소스의 접근허용 또는 특정 권한 요구,로그인, 로그아웃, 로그인,로그아웃 성공시 Event
     * 등의 설정이 가능하다.
     */


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
//        log.info("필터체인 진입");
//        http
//                .csrf((csrf) -> csrf.disable())
//                .authorizeHttpRequests((authorizeHttpRequests) ->
//                        authorizeHttpRequests
//                                .requestMatchers("/**").permitAll()
//                                .requestMatchers("/login").permitAll()
//                                .anyRequest().authenticated()
//                )
//                .formLogin((formLogin) -> {
//                    formLogin
//                            .loginPage("/login")
//                            .loginProcessingUrl("/login")
//                            .usernameParameter("loginId")
//                            .passwordParameter("password")
//                            .defaultSuccessUrl("/main")
//                            .permitAll();
//                });
//
//        // admin은 모든 접근에 대해 허락하고
//        // 게스트는 특정 url만 허락할 필요있음 : ex ) 검색, ...
//
//        return http.build();
//    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        log.info("필터체인 진입");
        http
                .csrf((csrf) -> csrf.disable())
                .authorizeHttpRequests((authorizeHttpRequests) ->
                                authorizeHttpRequests
                                .requestMatchers("/**").permitAll()
//                                        .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll() // resource의 static폴더 내부 허용
//                                        .requestMatchers("/v3/api-docs/**","/swagger-resources/**","/swagger-ui/**","/api-docs/**","/static/**").permitAll()
//                                        .requestMatchers("/api/sign-in", "/api/sign-up","/login/**").permitAll()
//                                        .anyRequest().authenticated()
                )
                // AccessDeniedHandler :  권한을 확인하는 과정에서 통과하지 못하는 예외가 발생할 경우 예외를 전달
                // AuthenticationEntryPoint : 인증과정에서 예외가 발생할 경웅 예외를 전달
                .exceptionHandling((exceptionHandling) ->
                        exceptionHandling.authenticationEntryPoint(new CustomAuthenticationEntryPoint()).accessDeniedHandler(new CustomAccessDeniedHandler())
                )
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
                ;


        // admin은 모든 접근에 대해 허락하고
        // 게스트는 특정 url만 허락할 필요있음 : ex ) 검색, ...

        return http.build();
    }




}
