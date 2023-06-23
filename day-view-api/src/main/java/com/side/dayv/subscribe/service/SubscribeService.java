package com.side.dayv.subscribe.service;

import com.side.dayv.channel.entity.Channel;
import com.side.dayv.channel.repository.ChannelRepository;
import com.side.dayv.global.exception.AlreadyExistsException;
import com.side.dayv.global.exception.BadRequestException;
import com.side.dayv.global.exception.NotFoundException;
import com.side.dayv.member.entity.Member;
import com.side.dayv.member.repository.MemberRepository;
import com.side.dayv.subscribe.dto.request.SubscribeUpdateDto;
import com.side.dayv.subscribe.entity.Subscribe;
import com.side.dayv.subscribe.entity.Subscribers;
import com.side.dayv.subscribe.repository.SubscribeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.side.dayv.global.util.ErrorMessage.*;

@Service
@Transactional
@RequiredArgsConstructor
public class SubscribeService {

    private final SubscribeRepository subscribeRepository;

    private final MemberRepository memberRepository;

    private final ChannelRepository channelRepository;

    public Subscribe subscribe(final Long memberId, final Long channelId) {

        if (subscribeRepository.existsByMemberIdAndChannelId(memberId, channelId)) {
            throw new AlreadyExistsException(SUBSCRIBE_ALREADY_EXISTS);
        }

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));

        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new NotFoundException(CHANNEL_NOT_FOUNT));

        return subscribeRepository.save(new Subscribe(member, channel));
    }

    public void unsubscribe(final Long memberId, final Long channelId) {

        Subscribe subscribe = subscribeRepository.findByMemberIdAndChannelId(memberId, channelId)
                .orElseThrow(() -> new NotFoundException(SUBSCRIBE_NOT_FOUND));

        if (subscribe.isManageAuth()) {
            throw new BadRequestException(BAD_REQUEST_MANAGE_UNSUBSCRIBE);
        }

        subscribeRepository.delete(subscribe);
    }

    public void update(final Long id, final Long memberId, final SubscribeUpdateDto request) {

        Subscribe subscribe = subscribeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(SUBSCRIBE_NOT_FOUND));

        if (!subscribe.isSameMember(memberId)) {
            throw new BadRequestException(BAD_REQUEST_PERMISSION);
        }

        subscribe.update(request.getColor(), request.isShowYn());
    }

    public Subscribe manageChannelSubscribe(final Member member, final Channel channel) {

        Subscribe manageChannelSubscribe = Subscribe.createManageChannelSubscribe(member, channel);

        return subscribeRepository.save(manageChannelSubscribe);
    }

    public void removeChannel(final Long memberId, final Long channelId) {

        Subscribe subscribe = subscribeRepository.findByMemberIdAndChannelId(memberId, channelId)
                .orElseThrow(() -> new NotFoundException(SUBSCRIBE_NOT_FOUND));

        if (!subscribe.isManageAuth()) {
            throw new BadRequestException(NO_PERMISSION);
        }

        subscribeRepository.delete(subscribe);
    }

    public Subscribers getSubscribers(final Long channelId){
        List<Subscribe> subscribes = subscribeRepository.findAllByChannelId(channelId);
        return new Subscribers(subscribes);
    }

}
