package com.master.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

@Configuration
@EnableWebSecurity

@RequiredArgsConstructor

public class SecurityConfiguration {
    public final JwtAthenticationFilter jwtAthenticationFilter;
    @Autowired
    private final  AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;

    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider);
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers("/token/**","/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/v1/vehicules", "/api/v1/vehicules/**").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/v1/annonces", "/api/v1/annonces/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/api/v1/commandes").permitAll()
                        .requestMatchers(HttpMethod.POST,"/api/v1/contacts").permitAll()
                        .requestMatchers(HttpMethod.POST,"/api/v1/rendezvous","/api/v1/rendezvous/**" ).permitAll()
                        .requestMatchers(HttpMethod.GET,"/voitures_images/**").permitAll()
                        .requestMatchers(HttpMethod.GET,"/documents/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/api/v1/users/getinvite").permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore( jwtAthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout ->
                        logout.logoutUrl("/api/auth/logout")
                                .addLogoutHandler(logoutHandler)
                                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext()))
                .build();
    }
}
