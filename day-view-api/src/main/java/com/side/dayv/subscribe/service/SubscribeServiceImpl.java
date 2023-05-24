package com.side.dayv.subscribe.service;

import com.side.dayv.channel.entity.Channel;
import com.side.dayv.channel.repository.ChannelRepository;
import com.side.dayv.global.exception.NotFoundException;
import com.side.dayv.global.util.ErrorMessage;
import com.side.dayv.member.entity.Member;
import com.side.dayv.member.repository.MemberRepository;
import com.side.dayv.subscribe.dto.request.SubscribeRequestDto;
import com.side.dayv.subscribe.entity.Subscribe;
import com.side.dayv.subscribe.repository.SubscribeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.side.dayv.global.util.ErrorMessage.*;

@Service
@Transactional
@RequiredArgsConstructor
public class SubscribeServiceImpl implements SubscribeService {

    private final SubscribeRepository subscribeRepository;

    private final MemberRepository memberRepository;

    private final ChannelRepository channelRepository;

    @Override
    public void subscribe(SubscribeRequestDto subscribeRequestDto) {
        Member findMember = memberRepository.findById(subscribeRequestDto.getMemberId())
                .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));

        Channel findChannel = channelRepository.findById(subscribeRequestDto.getChannelId())
                .orElseThrow(() -> new NotFoundException(CHANNEL_NOT_FOUNT));

        // TODO 이미 존재하는 구독 정보인지 확인하는 로직 추가 예정

        subscribeRepository.save(subscribeRequestDto
                .toEntity(findMember, findChannel));
    }
}
