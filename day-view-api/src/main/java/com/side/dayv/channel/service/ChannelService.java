package com.side.dayv.channel.service;

import com.side.dayv.channel.dto.request.ChannelCreateDto;
import com.side.dayv.channel.dto.response.ChannelResponseDto;
import com.side.dayv.channel.entity.Channel;
import com.side.dayv.channel.repository.ChannelRepository;
import com.side.dayv.global.exception.BadRequestException;
import com.side.dayv.global.exception.NotFoundException;
import com.side.dayv.member.entity.Member;
import com.side.dayv.member.repository.MemberRepository;
import com.side.dayv.oauth.entity.ProviderType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    public List<ChannelResponseDto> findManageChannels(final Long memberId) {
        return channelRepository.findManageChannels(memberId);
    }

    public List<ChannelResponseDto> findSubscribeChannels(final Long memberId) {
        return channelRepository.findSubscribeChannels(memberId);
    }

    public List<ChannelResponseDto> findGoogleChannels(final Long memberId) {
        memberRepository.findByIdAndProvider(memberId, ProviderType.GOOGLE)
                .orElseThrow(() -> new BadRequestException(BAD_REQUEST_GOOGLE_PERMISSION));
        return channelRepository.findGoogleChannels(memberId);
    }
}
