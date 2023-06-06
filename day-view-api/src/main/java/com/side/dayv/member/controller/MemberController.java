package com.side.dayv.member.controller;

import com.side.dayv.global.response.ApiResponse;
import com.side.dayv.member.dto.MemberResponse;
import com.side.dayv.member.entity.Member;
import com.side.dayv.member.repository.MemberRepository;
import com.side.dayv.member.service.MemberService;
import com.side.dayv.oauth.entity.CustomUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    @GetMapping
    public ResponseEntity<MemberResponse> getUser(@AuthenticationPrincipal final CustomUser user) {
        MemberResponse memberResponse = memberService.getMember(user.getUsername());

        return ResponseEntity.ok(memberResponse);
    }
}
