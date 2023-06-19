package com.side.dayv.member.controller;

import com.side.dayv.global.response.CommonResponse;
import com.side.dayv.member.dto.RequestMemberDTO;
import com.side.dayv.member.dto.ResponseMemberDTO;
import com.side.dayv.member.service.MemberService;
import com.side.dayv.oauth.entity.CustomUser;
import com.side.dayv.record.dto.RequestUpdateRecordDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    @GetMapping(value = "/me")
    public ResponseEntity<CommonResponse> getUser(@AuthenticationPrincipal final CustomUser user) {
        ResponseMemberDTO memberResponse = memberService.getMember(user.getUsername());

        return ResponseEntity.ok(new CommonResponse(memberResponse));
    }

    @PatchMapping(value = "/me")
    public ResponseEntity updateMyInfo(@AuthenticationPrincipal final CustomUser user,
                                       @RequestBody RequestMemberDTO requestMemberDTO){

        memberService.updateMyInfo(requestMemberDTO, user.getMemberId());
        return ResponseEntity.ok("");
    }
}
