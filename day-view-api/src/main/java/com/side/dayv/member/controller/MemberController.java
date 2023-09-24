package com.side.dayv.member.controller;

import com.side.dayv.global.exception.NotFoundException;
import com.side.dayv.global.response.CommonResponse;
import com.side.dayv.global.util.CookieUtil;
import com.side.dayv.global.util.ErrorMessage;
import com.side.dayv.member.dto.RequestMemberDTO;
import com.side.dayv.member.dto.ResponseMemberDTO;
import com.side.dayv.member.entity.Member;
import com.side.dayv.member.repository.MemberRepository;
import com.side.dayv.member.service.MemberService;
import com.side.dayv.oauth.config.properties.AppProperties;
import com.side.dayv.oauth.entity.CustomUser;
import com.side.dayv.oauth.token.AuthToken;
import com.side.dayv.oauth.token.AuthTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final AppProperties appProperties;
    private final AuthTokenProvider authTokenProvider;
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    @GetMapping(value = "/me")
    public ResponseEntity<CommonResponse<ResponseMemberDTO>> getUser(@AuthenticationPrincipal final CustomUser user) {
        ResponseMemberDTO memberResponse = memberService.getMember(user.getUsername());

        return ResponseEntity.ok(new CommonResponse<>(memberResponse));
    }

    @PatchMapping(value = "/me")
    public ResponseEntity<CommonResponse<Member>> updateMyInfo(@AuthenticationPrincipal final CustomUser user,
                                       @RequestBody RequestMemberDTO requestMemberDTO){

        Member member = memberService.updateMyInfo(requestMemberDTO, user.getMemberId());
        return ResponseEntity.ok(new CommonResponse<>(member));
    }

    @PostMapping("/refresh/token")
    public ResponseEntity<String> cookie(
            HttpServletRequest request,
            HttpServletResponse response,
            @AuthenticationPrincipal final CustomUser user
    ) {

        Long memberId = user.getMemberId();
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.MEMBER_NOT_FOUND));

        String refreshTokenStr = findMember.getRefreshToken();

        AuthToken refreshToken = authTokenProvider.convertAuthToken(refreshTokenStr);

        long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();

        int cookieMaxAge = (int) (new Date().getTime() + refreshTokenExpiry) / 60;

        CookieUtil.deleteCookie(request, response, CookieUtil.REFRESH_TOKEN);
        CookieUtil.addCookie(response, CookieUtil.REFRESH_TOKEN, refreshToken.getToken(), cookieMaxAge);

        return ResponseEntity.ok("ok");
    }
}
