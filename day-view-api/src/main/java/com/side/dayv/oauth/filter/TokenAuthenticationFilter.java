package com.side.dayv.oauth.filter;

import com.side.dayv.oauth.token.AuthToken;
import com.side.dayv.oauth.token.AuthTokenProvider;
import com.side.dayv.global.util.HeaderUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class TokenAuthenticationFilter extends OncePerRequestFilter {
    private final AuthTokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String tokenStr = HeaderUtil.getAccessToken(request);
        AuthToken token = tokenProvider.convertAuthToken(tokenStr);

        try{
            Authentication authentication = tokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            filterChain.doFilter(request, response);
        }catch (SecurityException e){
            log.info("Invalid JWT signature");
        }catch (MalformedJwtException e){
            log.info("Invalid JWT token. ");
        }catch (ExpiredJwtException e){
            log.info("Expired JWT token.");
        }catch (UnsupportedJwtException e){
            log.info("Unsupported JWT token.");
        }catch (IllegalArgumentException e){
            log.info("JWT token compact of handler are invalid.");
        }
        response.setStatus(HttpStatus.FORBIDDEN.value());
    }
}
