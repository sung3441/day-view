package com.side.dayv.member.service;

import com.side.dayv.member.entity.Member;
import com.side.dayv.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Member getMember(String email){
        return memberRepository.findByEmail(email);
    }
}
