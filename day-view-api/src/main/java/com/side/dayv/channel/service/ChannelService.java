package com.side.dayv.channel.service;

import com.side.dayv.channel.dto.request.ChannelCreateDto;
import com.side.dayv.channel.dto.request.ChannelSearchDto;
import com.side.dayv.channel.dto.response.ChannelResponseDto;
import com.side.dayv.channel.dto.response.ManageChannelResponseDto;
import com.side.dayv.channel.entity.Channel;
import com.side.dayv.channel.entity.ChannelSelectType;
import com.side.dayv.channel.repository.ChannelRepository;
import com.side.dayv.global.exception.BadRequestException;
import com.side.dayv.global.exception.NotFoundException;
import com.side.dayv.member.entity.Member;
import com.side.dayv.member.repository.MemberRepository;
import com.side.dayv.oauth.entity.ProviderType;
import com.side.dayv.subscribe.service.SubscribeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.side.dayv.global.util.ErrorMessage.*;

@Service
@Transactional
@RequiredArgsConstructor
public class ChannelService {

    private final SubscribeService subscribeService;

    private final ChannelRepository channelRepository;

    private final MemberRepository memberRepository;

    public Channel save(final Long memberId, final ChannelCreateDto request) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));

        Channel saveChannel = channelRepository.save(request.toEntity(member));

        // 채널 생성할 때 구독 정보도 같이 추가
        subscribeService.manageChannelSubscribe(member, saveChannel);

        return saveChannel;
    }

    public List<ManageChannelResponseDto> findMyChannels(final Long memberId, final ChannelSelectType selectType) {
        if (selectType == ChannelSelectType.GOOGLE) {
            memberRepository.findByIdAndProvider(memberId, ProviderType.GOOGLE)
                    .orElseThrow(() -> new BadRequestException(BAD_REQUEST_GOOGLE_PERMISSION));
        }

        return channelRepository.findMyChannels(memberId, selectType.whereQuery(), selectType.subscribeJoinOnQuery());
    }

    public Page<ChannelResponseDto> findChannels(final Long memberId, final Pageable pageable, final ChannelSearchDto search) {

        return channelRepository.findChannels(memberId, pageable, search);
    }
}
