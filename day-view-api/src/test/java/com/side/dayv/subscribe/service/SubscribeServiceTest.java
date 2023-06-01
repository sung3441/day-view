package com.side.dayv.subscribe.service;

import com.side.dayv.channel.entity.Channel;
import com.side.dayv.channel.entity.ChannelType;
import com.side.dayv.channel.repository.ChannelRepository;
import com.side.dayv.global.exception.AlreadyExistsException;
import com.side.dayv.global.exception.BadRequestException;
import com.side.dayv.global.exception.NotFoundException;
import com.side.dayv.member.entity.Member;
import com.side.dayv.member.repository.MemberRepository;
import com.side.dayv.oauth.entity.ProviderType;
import com.side.dayv.subscribe.dto.request.SubscribeUpdateDto;
import com.side.dayv.subscribe.entity.Subscribe;
import com.side.dayv.subscribe.entity.SubscribeColor;
import com.side.dayv.subscribe.repository.SubscribeRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
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

    @PersistenceContext
    EntityManager em;

    @Autowired
    SubscribeService subscribeService;

    @Autowired
    SubscribeRepository subscribeRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    ChannelRepository channelRepository;

    Member MEMBER;

    Channel CHANNEL;

    @BeforeEach
    void init() {
        MEMBER = memberRepository.save(Member.builder()
                .email("csi@test.com")
                .birthday("1985-12-30")
                .nickname("csi")
                .createdDate(LocalDateTime.now())
                .lastModifiedDate(LocalDateTime.now())
                .provider(ProviderType.GOOGLE)
                .profileImageUrl("")
                .build());

        CHANNEL = channelRepository.save(Channel.builder()
                .name("test")
                .channelType(ChannelType.MY)
                .secretYn(false)
                .createdDate(LocalDateTime.now())
                .lastModifiedDate(LocalDateTime.now())
                .member(MEMBER)
                .build());
    }

    @Test
    void 구독() {
        subscribeService.subscribe(MEMBER.getId(), CHANNEL.getId());

        Subscribe subscribe = subscribeRepository.findByMemberIdAndChannelId(MEMBER.getId(), CHANNEL.getId())
                .orElse(null);

        assertThat(subscribe != null).isTrue();
        assertThat(subscribe.getMember().getId()).isEqualTo(MEMBER.getId());
        assertThat(subscribe.getChannel().getId()).isEqualTo(CHANNEL.getId());
    }

    @Test
    void 구독실패_회원_없음() {
        assertThatThrownBy(() -> subscribeService.subscribe(99L, CHANNEL.getId()))
                .isInstanceOf(NotFoundException.class)
                .hasMessageContaining(MEMBER_NOT_FOUND);
    }

    @Test
    void 구독실패_채널_없음() {
        assertThatThrownBy(() -> subscribeService.subscribe(MEMBER.getId(), 99L))
                .isInstanceOf(NotFoundException.class)
                .hasMessageContaining(CHANNEL_NOT_FOUNT);
    }

    @Test
    void 구독실패_이미_구독() {
        subscribeService.subscribe(MEMBER.getId(), CHANNEL.getId());

        assertThatThrownBy(() -> subscribeService.subscribe(MEMBER.getId(), CHANNEL.getId()))
                .isInstanceOf(AlreadyExistsException.class)
                .hasMessageContaining(SUBSCRIBE_ALREADY_EXISTS);
    }

    @Test
    void 구독_취소() {
        Subscribe subscribe = subscribeService.subscribe(MEMBER.getId(), CHANNEL.getId());

        subscribeService.unsubscribe(MEMBER.getId(), subscribe.getId());

        Optional<Subscribe> subscribeOptional = subscribeRepository.findById(subscribe.getId());

        assertThat(subscribeOptional.isEmpty()).isTrue();
    }

    @Test
    void 구독_취소_실패_권한_없음() {
        Subscribe subscribe = subscribeService.subscribe(MEMBER.getId(), CHANNEL.getId());

        assertThatThrownBy(() -> subscribeService.unsubscribe(99L, subscribe.getId()))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining(BAD_REQUEST_PERMISSION);
    }

    @Test
    void 구독_취소_실패_구독정보_없음() {
        subscribeService.subscribe(MEMBER.getId(), CHANNEL.getId());

        assertThatThrownBy(() -> subscribeService.unsubscribe(MEMBER.getId(), 99L))
                .isInstanceOf(NotFoundException.class)
                .hasMessageContaining(SUBSCRIBE_NOT_FOUND);
    }

    @Test
    void 구독_취소_실패_관리자_권한() {
        Subscribe subscribe = subscribeService.subscribe(MEMBER.getId(), CHANNEL.getId());
        subscribe.changeAuthToManage();
        subscribeRepository.save(subscribe);

        assertThatThrownBy(() -> subscribeService.unsubscribe(MEMBER.getId(), subscribe.getId()))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining(BAD_REQUEST_MANAGE_UNSUBSCRIBE);
    }

    @Test
    void 구독_수정() {
        Subscribe subscribe = subscribeService.subscribe(MEMBER.getId(), CHANNEL.getId());

        SubscribeUpdateDto subscribeUpdateDto = new SubscribeUpdateDto(SubscribeColor.BLUE, false);

        subscribeService.update(subscribe.getId(), MEMBER.getId(), subscribeUpdateDto);

        Subscribe updateSubscribe = subscribeRepository.findById(subscribe.getId()).get();

        assertThat(updateSubscribe.getColor()).isEqualTo(SubscribeColor.BLUE);
        assertThat(updateSubscribe.isShowYn()).isFalse();
    }

    @Test
    void 구독_수정_실패_구독_없음() {
        SubscribeUpdateDto subscribeUpdateDto = new SubscribeUpdateDto(SubscribeColor.BLUE, false);

        assertThatThrownBy(() -> subscribeService.update(99L, MEMBER.getId(), subscribeUpdateDto))
                .isInstanceOf(NotFoundException.class)
                .hasMessageContaining(SUBSCRIBE_NOT_FOUND);
    }

    @Test
    void 구독_수정_실패_권한_없음() {
        Subscribe subscribe = subscribeService.subscribe(MEMBER.getId(), CHANNEL.getId());

        SubscribeUpdateDto subscribeUpdateDto = new SubscribeUpdateDto(SubscribeColor.BLUE, false);

        assertThatThrownBy(() -> subscribeService.update(subscribe.getId(), 99L, subscribeUpdateDto))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining(BAD_REQUEST_PERMISSION);
    }
}