package com.side.dayv.member.service;

import com.side.dayv.global.exception.NotFoundException;
import com.side.dayv.member.dto.RequestMemberDTO;
import com.side.dayv.member.dto.ResponseMemberDTO;
import com.side.dayv.member.entity.Member;
import com.side.dayv.member.repository.MemberRepository;
import com.side.dayv.subscribe.entity.Subscribe;
import com.side.dayv.subscribe.entity.SubscribeAuth;
import com.side.dayv.subscribe.repository.SubscribeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.side.dayv.global.util.ErrorMessage.MEMBER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final SubscribeRepository subscribeRepository;

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

    @Transactional
    public Member updateMyInfo(RequestMemberDTO requestMemberDTO, Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(()->new NotFoundException(MEMBER_NOT_FOUND));

        member.changeMyInfo(requestMemberDTO);
        return member;
    }
}
