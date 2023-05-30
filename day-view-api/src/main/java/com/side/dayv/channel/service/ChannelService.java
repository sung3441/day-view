package com.side.dayv.channel.service;

import com.side.dayv.channel.dto.request.ChannelCreateDto;
import com.side.dayv.channel.entity.Channel;
import com.side.dayv.channel.repository.ChannelRepository;
import com.side.dayv.global.exception.NotFoundException;
import com.side.dayv.member.entity.Member;
import com.side.dayv.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.side.dayv.global.util.ErrorMessage.*;

@Service
@Transactional
@RequiredArgsConstructor
public class ChannelService {

    private final ChannelRepository channelRepository;

    private final MemberRepository memberRepository;

    public Channel save(final Long memberId, final ChannelCreateDto request) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));

        return channelRepository.save(request.toEntity(member));
    }
}
