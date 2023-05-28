package com.side.dayv.subscribe.service;

import com.side.dayv.channel.entity.Channel;
import com.side.dayv.channel.entity.ChannelType;
import com.side.dayv.channel.repository.ChannelRepository;
import com.side.dayv.global.exception.AlreadyExistsException;
import com.side.dayv.global.exception.NotFoundException;
import com.side.dayv.member.entity.Member;
import com.side.dayv.member.repository.MemberRepository;
import com.side.dayv.oauth.entity.ProviderType;
import com.side.dayv.subscribe.dto.request.SubscribeRequestDto;
import com.side.dayv.subscribe.entity.Subscribe;
import com.side.dayv.subscribe.repository.SubscribeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

import static com.side.dayv.global.util.ErrorMessage.*;
import static org.assertj.core.api.Assertions.*;

@Transactional
@SpringBootTest
class SubscribeServiceTest {

    @Autowired
    SubscribeService subscribeService;

    @Autowired
    SubscribeRepository subscribeRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    ChannelRepository channelRepository;

    Member member;

    Channel channel;

    SubscribeRequestDto subscribeRequestDto;

    @BeforeEach
    void init() {
        member = memberRepository.save(Member.builder()
                .email("csi@test.com")
                .birthday("1985-12-30")
                .nickname("csi")
                .createdDate(LocalDateTime.now())
                .lastModifiedDate(LocalDateTime.now())
                .provider(ProviderType.GOOGLE)
                .profileImageUrl("")
                .build());

        channel = channelRepository.save(Channel.builder()
                .channelType(ChannelType.MY)
                .secretYn(false)
                .password(null)
                .createdDate(LocalDateTime.now())
                .lastModifiedDate(LocalDateTime.now())
                .member(member)
                .build());

        subscribeRequestDto = new SubscribeRequestDto(member.getMemberId(), channel.getId());
    }

    @Test
    void 구독() {
        subscribeService.subscribe(subscribeRequestDto);

        Optional<Subscribe> subscribeOptional = subscribeRepository.findBySubscriberAndChannel(member, channel);

        assertThat(subscribeOptional.isPresent()).isTrue();
        assertThat(subscribeOptional.get().getSubscriber().getMemberId()).isEqualTo(member.getMemberId());
        assertThat(subscribeOptional.get().getChannel().getId()).isEqualTo(channel.getId());
    }

    @Test
    void 구독실패_회원_없음() {
        subscribeRequestDto.setMemberId(99L);

        assertThatThrownBy(() -> subscribeService.subscribe(subscribeRequestDto))
                .isInstanceOf(NotFoundException.class)
                .hasMessageContaining(MEMBER_NOT_FOUND);
    }

    @Test
    void 구독실패_채널_없음() {
        subscribeRequestDto.setChannelId(99L);

        assertThatThrownBy(() -> subscribeService.subscribe(subscribeRequestDto))
                .isInstanceOf(NotFoundException.class)
                .hasMessageContaining(CHANNEL_NOT_FOUNT);
    }

    @Test
    void 구독실패_이미_구독() {
        subscribeService.subscribe(subscribeRequestDto);

        assertThatThrownBy(() -> subscribeService.subscribe(subscribeRequestDto))
                .isInstanceOf(AlreadyExistsException.class)
                .hasMessageContaining(SUBSCRIBE_ALREADY_EXISTS);
    }

    @Test
    void 구독_취소() {
        Subscribe subscribe = subscribeService.subscribe(subscribeRequestDto);

        subscribeService.unsubscribe(subscribe.getId(), member.getEmail());

        Optional<Subscribe> subscribeOptional = subscribeRepository.findBySubscriberAndChannel(member, channel);

        assertThat(subscribeOptional.isEmpty()).isTrue();
    }

    @Test
    void 구독_취소_실패_회원_없음() {
        Subscribe subscribe = subscribeService.subscribe(subscribeRequestDto);

        assertThatThrownBy(() -> subscribeService.unsubscribe(subscribe.getId(), "NOT FOUND EMAIL"))
                .isInstanceOf(NotFoundException.class)
                .hasMessageContaining(MEMBER_NOT_FOUND);
    }

    @Test
    void 구독_취소_실패_구독정보_없음() {
        assertThatThrownBy(() -> subscribeService.unsubscribe(99L, member.getEmail()))
                .isInstanceOf(NotFoundException.class)
                .hasMessageContaining(SUBSCRIBE_NOT_FOUND);
    }
}