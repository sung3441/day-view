package com.side.dayv.oauth.token;


import com.side.dayv.oauth.entity.CustomUser;
import com.side.dayv.oauth.exception.TokenValidFailedException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
public class AuthTokenProvider {

    private final Key key;
    private static final String AUTHORITIES_KEY = "role";

    public AuthTokenProvider(String secret){
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public AuthToken createAuthToken(String id, Date expiry){
        return new AuthToken(id, expiry, key);
    }

    public AuthToken createAuthToken(String id, Long memberId, Date expiry){
        return new AuthToken(id, memberId, expiry, key);
    }

    public AuthToken convertAuthToken(String token){
        return new AuthToken(token, key);
    }

    public Authentication getAuthentication(AuthToken authToken){
        if(authToken.validate()){
            Claims claims = authToken.getTokenClaims();

            Collection<? extends GrantedAuthority> authorities =
                    Arrays.stream(new String[]{})
                            .map(SimpleGrantedAuthority::new)
                            .collect(Collectors.toList());
            log.debug("claims subject := [{}]", claims.getSubject());
            Long memberId = claims.get("member_id", Long.class);
            CustomUser principal = new CustomUser(claims.getSubject(), "", authorities, memberId);

            return new UsernamePasswordAuthenticationToken(principal, authToken, authorities);
        }
        throw new TokenValidFailedException();
    }
}
