package com.side.dayv.subscribe.service;

import com.side.dayv.channel.entity.Channel;
import com.side.dayv.channel.repository.ChannelRepository;
import com.side.dayv.global.exception.AlreadyExistsException;
import com.side.dayv.global.exception.NotFoundException;
import com.side.dayv.member.entity.Member;
import com.side.dayv.member.repository.MemberRepository;
import com.side.dayv.subscribe.dto.request.SubscribeRequestDto;
import com.side.dayv.subscribe.entity.Subscribe;
import com.side.dayv.subscribe.repository.SubscribeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.side.dayv.global.util.ErrorMessage.*;

@Service
@Transactional
@RequiredArgsConstructor
public class SubscribeServiceImpl implements SubscribeService {

    private final SubscribeRepository subscribeRepository;

    private final MemberRepository memberRepository;

    private final ChannelRepository channelRepository;

    @Override
    public Subscribe subscribe(final SubscribeRequestDto subscribeRequestDto) {
        Member findMember = memberRepository.findById(subscribeRequestDto.getMemberId())
                .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));

        Channel findChannel = channelRepository.findById(subscribeRequestDto.getChannelId())
                .orElseThrow(() -> new NotFoundException(CHANNEL_NOT_FOUNT));

        Optional<Subscribe> findSubscribeOptional = subscribeRepository
                .findBySubscriberAndChannel(findMember, findChannel);

        if (!findSubscribeOptional.isEmpty()) {
            throw new AlreadyExistsException(SUBSCRIBE_ALREADY_EXISTS);
        }

        return subscribeRepository.save(subscribeRequestDto
                .toEntity(findMember, findChannel));
    }

    @Override
    public void unsubscribe(final Long subscribeId, final String email) {

        Member findMember = memberRepository.findByEmail(email);
        if (findMember == null) {
            throw new NotFoundException(MEMBER_NOT_FOUND);
        }

        Optional<Subscribe> subscribeOptional = subscribeRepository.findById(subscribeId);

        // 다른 사람의 구독 정보 접근 시 없는 구독 정보로 판단
        if (subscribeOptional.isEmpty() || findMember != subscribeOptional.get().getSubscriber()) {
            throw new NotFoundException(SUBSCRIBE_NOT_FOUND);
        }

        subscribeRepository.delete(subscribeOptional.get());
    }
}
