package com.master.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.master.Services.JwtService;
import com.master.models.Enseignant;
import com.master.models.Role;
import com.master.models.Token;
import com.master.models.TokenType;
import com.master.repositories.EnseignantRepository;
import com.master.repositories.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final EnseignantRepository EnseignantRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final TokenRepository tokenRepository;
    public AuthenticationResponse registre(RegistreRequest request) {
        var user= Enseignant.builder()
                .email(request.getEmail())
                .nom(request.getNom())
                .prenom(request.getPrenom())
                .password(passwordEncoder.encode(request.getPassword()) )
                .role(Role.ENSEIGNANT)
                .build();
        var savedUser = EnseignantRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user=EnseignantRepository.findEnseignantByEmail(request.getEmail())
                .orElseThrow(()->new RuntimeException("User not found"));
        var token=jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, token);
        return AuthenticationResponse.builder()
                .token(token)
                .refreshToken(refreshToken)
                .build();
    }

    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            var user = this.EnseignantRepository.findEnseignantByEmail(userEmail)
                    .orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                var authResponse = AuthenticationResponse.builder()
                        .token(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }

    private void saveUserToken(Enseignant user, String jwtToken) {
        var token = Token.builder()
                .enseignant(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(Enseignant user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getEmail());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }


    public Boolean checkEmail(String email) {
        return EnseignantRepository.existsEnseignantByEmail(email);
    }

    public boolean checkPassword(String password) {
        //password greater than 8 characters and contains at least one number and  one letter and one special character and one upper case and one lower case
        return password.matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$");

    }
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String accessToken;
        final String userEmail;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        accessToken = authHeader.substring(7);
        userEmail = JwtService.extractUsername(accessToken);
        if (userEmail != null) {
            var user = this.EnseignantRepository.findEnseignantByEmail(userEmail)
                    .orElseThrow();
            revokeAllUserTokens(user);
        }
    }


}
