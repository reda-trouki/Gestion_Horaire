package com.master.config;
import com.master.models.Enseignant;
import com.master.repositories.EnseignantRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Collections;

@Configuration

public class ApplicationConfig {

    private final EnseignantRepository EnseignantRepository;

    public ApplicationConfig(EnseignantRepository EnseignantRepository, EnseignantRepository EnseignantRepository1) {
        this.EnseignantRepository = EnseignantRepository1;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return Enseignant -> {
            Enseignant user = EnseignantRepository.findEnseignantByEmail(Enseignant)
                    .orElseThrow(() -> new UsernameNotFoundException("Enseignant not found"));
            GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(user.getRole().name());
            UserDetails userDetails = new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), Collections.singleton(grantedAuthority));
            return userDetails;
        };
    }
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider=new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public  PasswordEncoder  passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();

    }
}
