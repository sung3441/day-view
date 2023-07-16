package com.side.dayv.channel.service;

import com.side.dayv.channel.dto.request.CreateChannelDto;
import com.side.dayv.channel.dto.request.SearchChannelDto;
import com.side.dayv.channel.dto.request.UpdateChannelDto;
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
import com.side.dayv.subscribe.entity.Subscribe;
import com.side.dayv.subscribe.repository.SubscribeRepository;
import com.side.dayv.subscribe.service.SubscribeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.side.dayv.global.util.ErrorMessage.*;

@Service
@Transactional
@RequiredArgsConstructor
public class ChannelService {

    private final SubscribeService subscribeService;

    private final SubscribeRepository subscribeRepository;

    private final ChannelRepository channelRepository;

    private final MemberRepository memberRepository;

    public Channel save(final Long memberId, final CreateChannelDto request) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));

        Channel saveChannel = channelRepository.save(request.toEntity(member));

        // 채널 생성할 때 구독 정보도 같이 추가
        subscribeService.manageChannelSubscribe(member, saveChannel);

        return saveChannel;
    }

    @Transactional
    public Channel update(final Long memberId, final Long channelId, final UpdateChannelDto request) {

        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new NotFoundException(CHANNEL_NOT_FOUNT));

        Subscribe subscribe = subscribeRepository.findByMemberIdAndChannelId(memberId, channelId)
                .orElseThrow(() -> new AccessDeniedException(NO_PERMISSION));

        if (!subscribe.isManageAuth()) {
            throw new AccessDeniedException(NO_PERMISSION);
        }

        if (channel.isMyChannel()) {
            throw new BadRequestException(IMPOSSIBLE_MY_CHANNEL_UPDATE);
        }

        channel.updateChannel(request);

        return channelRepository.save(channel);
    }

    public List<ManageChannelResponseDto> findMyChannels(final Long memberId, final ChannelSelectType selectType) {
        if (selectType == ChannelSelectType.GOOGLE) {
            memberRepository.findByIdAndProvider(memberId, ProviderType.GOOGLE)
                    .orElseThrow(() -> new BadRequestException(BAD_REQUEST_GOOGLE_PERMISSION));
        }

        return channelRepository.findMyChannels(memberId, selectType.whereQuery(), selectType.subscribeJoinOnQuery());
    }

    public Page<ChannelResponseDto> findChannels(final Long memberId, final Pageable pageable, final SearchChannelDto search) {

        return channelRepository.findChannels(memberId, pageable, search);
    }

    public void removeChannel(final Long memberId, final Long channelId){
        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new NotFoundException(CHANNEL_NOT_FOUNT));

        if (channel.isMyChannel() ){
            throw new BadRequestException(IMPOSSIBLE_MY_CHANNEL_DELETE);
        }

        subscribeService.removeChannel(memberId, channelId);
        channelRepository.delete(channel);
    }
}
