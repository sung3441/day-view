package com.side.dayv.oauth.controller;

import com.side.dayv.global.exception.NotFoundException;
import com.side.dayv.global.response.ApiResponse;
import com.side.dayv.global.util.CookieUtil;
import com.side.dayv.global.util.HeaderUtil;
import com.side.dayv.member.entity.Member;
import com.side.dayv.member.repository.MemberRepository;
import com.side.dayv.member.service.MemberService;
import com.side.dayv.oauth.TokenResponse;
import com.side.dayv.oauth.config.properties.AppProperties;
import com.side.dayv.oauth.entity.AuthReqModel;
import com.side.dayv.oauth.entity.CustomUser;
import com.side.dayv.oauth.entity.MemberPrincipal;
import com.side.dayv.oauth.token.AuthToken;
import com.side.dayv.oauth.token.AuthTokenProvider;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AppProperties appProperties;
    private final AuthTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    private final static long THREE_DAYS_MSEC = 259200000;
    private final static String REFRESH_TOKEN = "refresh_token";

    @PostMapping("/logout")
    public ResponseEntity logout(@AuthenticationPrincipal final CustomUser user,
                                 HttpServletRequest request, HttpServletResponse response) {
        String userId = user.getUsername();

        memberService.removeRefreshToken(userId);
        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);

        return ResponseEntity.ok("");
    }

    @GetMapping("/refresh")
    public ResponseEntity refreshToken(HttpServletRequest request, HttpServletResponse response) {
        // refresh token
        String refreshToken = CookieUtil.getCookie(request, REFRESH_TOKEN)
                .map(Cookie::getValue)
                .orElse((null));
        AuthToken authRefreshToken = tokenProvider.convertAuthToken(refreshToken);
        Claims claims = authRefreshToken.getTokenClaims();
        String userId = claims.getSubject();

        // userId refresh token 으로 DB 확인
        Member member = memberRepository.findByEmailAndRefreshToken(userId, refreshToken);
        if (member == null) {
            throw new NotFoundException("사용자를 찾을 수 없습니다.");
        }

        Date now = new Date();
        AuthToken newAccessToken = tokenProvider.createAuthToken(
                userId,
                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
        );

        long validTime = authRefreshToken.getTokenClaims()
                .getExpiration()
                .getTime() - now.getTime();

        // refresh 토큰 기간이 3일 이하로 남은 경우, refresh 토큰 갱신
        if (validTime <= THREE_DAYS_MSEC) {
            // refresh 토큰 설정
            long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();

            authRefreshToken = tokenProvider.createAuthToken(
                    appProperties.getAuth().getTokenSecret(),
                    new Date(now.getTime() + refreshTokenExpiry)
            );

            // DB에 refresh 토큰 업데이트
            member.changeRefreshToken(authRefreshToken.getToken());

            int cookieMaxAge = (int) refreshTokenExpiry / 60;
            CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
            CookieUtil.addCookie(response, REFRESH_TOKEN, authRefreshToken.getToken(), cookieMaxAge);
        }

        return ResponseEntity.ok(new TokenResponse(newAccessToken.getToken()));
    }
}
