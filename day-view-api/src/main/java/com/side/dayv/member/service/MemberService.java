package com.side.dayv.member.service;

import com.side.dayv.member.dto.ResponseMemberDTO;
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

    @Transactional
    public ResponseMemberDTO getMember(String email){
        Member member = memberRepository.findByEmail(email);
        if( member == null ){
            throw new UsernameNotFoundException("not found username.");
        }

        return ResponseMemberDTO.builder()
                .memberId(member.getId())
                .provider(member.getProvider())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .createdDate(member.getCreatedDate())
                .lastModifiedDate(member.getLastModifiedDate())
                .profileImageUrl(member.getProfileImageUrl())
                .birthday(member.getBirthday())
                .refreshToken(member.getRefreshToken())
                .build();
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
