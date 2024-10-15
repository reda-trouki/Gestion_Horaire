package com.master.Services;

import com.master.models.Enseignant;
import com.master.models.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    private static final  String SECRET_KEY="vM7q4hGPLPqbcbHcOCRGTCxEs9noYAHP8pBpay4B5nLSv3t+MLfZu+cagKTki0LT";
    public static String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    public static <T> T extractClaim(String token, Function<Claims, T> claimsRsolver){
        final Claims claims=extractAllClaims(token);
        return claimsRsolver.apply(claims);
    }
    private static Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    public String generateToken(UserDetails userDetails){
        Map<String,Object> claims = new HashMap<>();
        claims.put("fullName", ((Enseignant) userDetails).getNom());
        claims.put("role", ((Enseignant) userDetails).getRole());
        return generateToken(claims, userDetails);
    }
    public String generateRefreshToken(UserDetails userDetails){
        Map<String,Object> claims = new HashMap<>();
        claims.put("fullName", ((Enseignant) userDetails).getNom());
        claims.put("role", ((Enseignant) userDetails).getRole());
        return generateRefreshToken(claims, userDetails);
    }
public boolean isTokenValid(String token, UserDetails userDetails){
    final String username=extractUsername(token);
    String role=userDetails.getAuthorities().stream().findFirst().get().getAuthority();

    return
            username.equals(userDetails.getUsername())
            && (!isTokenExpired(token))
            && extractRole(token).name().equals(role);
}

    private Role extractRole(String token) {
        return extractClaim(token, claims -> Role.valueOf((String) claims.get("role")));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public String generateToken(Map<String,Object> claims, UserDetails userDetails){
        return Jwts
                .builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+1000*60*60*10))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    private static Key getSigningKey() {
        byte[] keyBytes= Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }


    public String generateRefreshToken(Map<String,Object> claims, UserDetails userDetails) {
        long exp=(1000*60*60*10)*3;//3 days
        return Jwts
                .builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+exp))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
}
