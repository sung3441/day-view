package com.side.dayv.oauth.token;

import io.jsonwebtoken.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.security.Key;
import java.util.Date;

@Slf4j
@RequiredArgsConstructor
public class AuthToken {

    @Getter
    private final String token;
    private final Key key;

    private static final String AUTHORITIES_KEY = "role";
    private static final String MEMBER_KEY = "member_id";

    AuthToken(String id, Date expiry, Key key){
        this.key = key;
        this.token = createAuthToken(id, expiry);
    }

    AuthToken(String id, Long memberId, Date expiry, Key key){
        this.key = key;
        this.token =  createAuthToken(id, memberId, expiry);
    }
    private String createAuthToken(String id, Date expiry) {
        return Jwts.builder()
                .setSubject(id)
                .signWith(key, SignatureAlgorithm.HS256)
                .setExpiration(expiry)
                .compact();
    }
    private String createAuthToken(String id, Long email, Date expiry) {
        return Jwts.builder()
                .setSubject(id)
                .claim(MEMBER_KEY, email)
                .signWith(key, SignatureAlgorithm.HS256)
                .setExpiration(expiry)
                .compact();
    }

    public boolean validate(){
        return this.getTokenClaims() != null;
    }

    public Claims getTokenClaims() {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

    }
    public Claims getExpiredTokenClaims(){
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        }catch (ExpiredJwtException e){
            log.info("Expired JWT token.");
            return e.getClaims();
        }
        return null;
    }

}
