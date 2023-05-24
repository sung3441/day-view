package com.side.dayv.member.service;

import com.side.dayv.member.entity.Member;
import com.side.dayv.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Member getMember(String email){
        return memberRepository.findByEmail(email);
    }

    @Transactional
    public void removeRefreshToken(String email){
        Member member = memberRepository.findByEmail(email);
        if( member == null ){
            throw new UsernameNotFoundException("not found username.");
        }

        member.changeRefreshToken(null);
    }
}
