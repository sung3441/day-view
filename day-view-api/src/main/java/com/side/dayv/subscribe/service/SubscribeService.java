package com.side.dayv.subscribe.service;

import com.side.dayv.channel.entity.Channel;
import com.side.dayv.channel.repository.ChannelRepository;
import com.side.dayv.global.exception.AlreadyExistsException;
import com.side.dayv.global.exception.BadRequestException;
import com.side.dayv.global.exception.NotFoundException;
import com.side.dayv.member.entity.Member;
import com.side.dayv.member.repository.MemberRepository;
import com.side.dayv.subscribe.dto.request.SubscribeUpdateDto;
import com.side.dayv.subscribe.entity.ResponseSubscribeDTO;
import com.side.dayv.subscribe.entity.Subscribe;
import com.side.dayv.subscribe.entity.Subscribers;
import com.side.dayv.subscribe.repository.SubscribeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.PermissionDeniedDataAccessException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.NoPermissionException;
import java.util.List;

import static com.side.dayv.global.util.ErrorMessage.*;

@Service
@Transactional
@RequiredArgsConstructor
public class SubscribeService {

    private final SubscribeRepository subscribeRepository;

    private final MemberRepository memberRepository;

    private final ChannelRepository channelRepository;

    public ResponseSubscribeDTO subscribe(final Long memberId, final Long channelId) {

        if (subscribeRepository.existsByMemberIdAndChannelId(memberId, channelId)) {
            throw new AlreadyExistsException(SUBSCRIBE_ALREADY_EXISTS);
        }

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));

        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new NotFoundException(CHANNEL_NOT_FOUNT));

        return subscribeRepository.save(new Subscribe(member, channel))
                .toResponseSubscribeDTO();
    }

    public void unsubscribe(final Long memberId, final Long channelId) {

        Subscribe subscribe = subscribeRepository.findByMemberIdAndChannelId(memberId, channelId)
                .orElseThrow(() -> new NotFoundException(SUBSCRIBE_NOT_FOUND));

        if (subscribe.isManageAuth()) {
            throw new BadRequestException(BAD_REQUEST_MANAGE_UNSUBSCRIBE);
        }

        subscribeRepository.delete(subscribe);
    }

    public ResponseSubscribeDTO update(final Long id, final Long memberId, final SubscribeUpdateDto request) {

        Subscribe subscribe = subscribeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(SUBSCRIBE_NOT_FOUND));

        if (!subscribe.isSameMember(memberId)) {
            throw new BadRequestException(BAD_REQUEST_PERMISSION);
        }

        subscribe.changeSubscribeAuth(request.getAuth());
        subscribe.update(request.getColor(), request.isShowYn());

        return subscribe.toResponseSubscribeDTO();
    }

    public Subscribe manageChannelSubscribe(final Member member, final Channel channel) {

        Subscribe manageChannelSubscribe = Subscribe.createManageChannelSubscribe(member, channel);

        return subscribeRepository.save(manageChannelSubscribe);
    }

    public void removeChannel(final Long memberId, final Long channelId) {

        Subscribe subscribe = subscribeRepository.findByMemberIdAndChannelId(memberId, channelId)
                .orElseThrow(() -> new NotFoundException(SUBSCRIBE_NOT_FOUND));

        if (!subscribe.isManageAuth()) {
            throw new AccessDeniedException(NO_PERMISSION);
        }

        subscribeRepository.delete(subscribe);
    }

    public Subscribers getSubscribers(final Long memberId, final Long channelId) {
        List<Subscribe> subscribeList = subscribeRepository.findAllByChannelIdOrderByAuth(channelId);
        Subscribers subscribers = new Subscribers(subscribeList);

        if( !subscribers.isManageAuth(memberId) ){
            throw new AccessDeniedException(NO_PERMISSION);
        }
        return subscribers;
    }

}
