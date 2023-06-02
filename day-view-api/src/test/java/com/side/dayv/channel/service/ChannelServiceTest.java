package com.side.dayv.channel.service;

import com.side.dayv.channel.dto.request.ChannelCreateDto;
import com.side.dayv.channel.dto.response.ChannelResponseDto;
import com.side.dayv.channel.entity.Channel;
import com.side.dayv.channel.entity.ChannelSelectType;
import com.side.dayv.channel.entity.ChannelType;
import com.side.dayv.channel.repository.ChannelRepository;
import com.side.dayv.member.entity.Member;
import com.side.dayv.member.repository.MemberRepository;
import com.side.dayv.oauth.entity.ProviderType;
import com.side.dayv.subscribe.entity.Subscribe;
import com.side.dayv.subscribe.entity.SubscribeAuth;
import com.side.dayv.subscribe.entity.SubscribeColor;
import com.side.dayv.subscribe.repository.SubscribeRepository;
import com.side.dayv.subscribe.service.SubscribeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
@Commit
class ChannelServiceTest {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    ChannelRepository channelRepository;

    @Autowired
    SubscribeRepository subscribeRepository;

    @Autowired
    ChannelService channelService;

    Member MEMBER;

    ChannelCreateDto CREATE_REQUEST;

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

        CREATE_REQUEST = ChannelCreateDto.builder()
                .name("테스트 채널")
                .secretYn(false)
                .build();
    }

    @Test
    void 채널_등록() {
        Channel saveChannel = channelService.save(MEMBER.getId(), CREATE_REQUEST);

        assertThat(saveChannel.getType()).isEqualTo(ChannelType.CUSTOM);
        assertThat(saveChannel.getName()).isEqualTo(CREATE_REQUEST.getName());
        assertThat(saveChannel.getCreateMember()).isEqualTo(MEMBER);
    }

    @Test
    void 비밀채널_등록() {
        ChannelCreateDto secret = ChannelCreateDto.builder()
                .name("비밀 채널 테스트")
                .secretYn(true)
                .build();

        Channel secretChannel = channelService.save(MEMBER.getId(), secret);
        assertThat(secretChannel.getType()).isEqualTo(ChannelType.SECRET);
    }

    @Test
    void 관리채널_조회() {
        LocalDateTime now = LocalDateTime.now();

        Channel myChannel = Channel.builder()
                .name("내 일정")
                .member(MEMBER)
                .channelType(ChannelType.MY)
                .createdDate(now)
                .lastModifiedDate(now)
                .build();

        Channel saveChannel = channelRepository.save(myChannel);

        Subscribe subscribe = Subscribe.builder()
                .color(SubscribeColor.YELLOW)
                .auth(SubscribeAuth.MANAGE)
                .showYn(true)
                .subscribeDate(now)
                .member(MEMBER)
                .channel(saveChannel)
                .build();

        subscribeRepository.save(subscribe);

        List<ChannelResponseDto> myChannels = channelService.findMyChannels(MEMBER.getId(), ChannelSelectType.MANAGE);

        ChannelResponseDto findChannel = myChannels.get(0);

        assertThat(findChannel.getChannelType()).isEqualTo(ChannelType.MY);
        assertThat(findChannel.getId()).isEqualTo(saveChannel.getId());
        assertThat(findChannel.getName()).isEqualTo("내 일정");
        assertThat(findChannel.getCreatorId()).isEqualTo(MEMBER.getId());
        assertThat(myChannels.size()).isEqualTo(1);
    }

    @Test
    void 구독채널_조회() {
        LocalDateTime now = LocalDateTime.now();

        Channel newChannel = Channel.builder()
                .name("새 채널")
                .member(MEMBER)
                .channelType(ChannelType.CUSTOM)
                .createdDate(now)
                .lastModifiedDate(now)
                .build();

        Channel saveChannel = channelRepository.save(newChannel);

        Subscribe subscribe = new Subscribe(MEMBER, newChannel);

        subscribeRepository.save(subscribe);

        List<ChannelResponseDto> myChannels = channelService.findMyChannels(MEMBER.getId(), ChannelSelectType.SUBSCRIBE);

        ChannelResponseDto findChannel = myChannels.get(0);

        assertThat(findChannel.getChannelType()).isEqualTo(ChannelType.CUSTOM);
        assertThat(findChannel.getId()).isEqualTo(saveChannel.getId());
        assertThat(findChannel.getName()).isEqualTo("새 채널");
        assertThat(findChannel.getCreatorId()).isEqualTo(MEMBER.getId());
        assertThat(myChannels.size()).isEqualTo(1);
    }

    @Test
    void 구글채널_조회() {
        LocalDateTime now = LocalDateTime.now();

        Channel newChannel = Channel.builder()
                .name("구글 채널")
                .member(MEMBER)
                .channelType(ChannelType.GOOGLE)
                .createdDate(now)
                .lastModifiedDate(now)
                .build();

        Channel saveChannel = channelRepository.save(newChannel);

        Subscribe subscribe = Subscribe.builder()
                .color(SubscribeColor.YELLOW)
                .auth(SubscribeAuth.MANAGE)
                .showYn(true)
                .subscribeDate(now)
                .member(MEMBER)
                .channel(saveChannel)
                .build();

        subscribeRepository.save(subscribe);

        List<ChannelResponseDto> myChannels = channelService.findMyChannels(MEMBER.getId(), ChannelSelectType.GOOGLE);

        ChannelResponseDto findChannel = myChannels.get(0);

        assertThat(findChannel.getChannelType()).isEqualTo(ChannelType.GOOGLE);
        assertThat(findChannel.getId()).isEqualTo(saveChannel.getId());
        assertThat(findChannel.getName()).isEqualTo("구글 채널");
        assertThat(findChannel.getCreatorId()).isEqualTo(MEMBER.getId());
        assertThat(myChannels.size()).isEqualTo(1);
    }
}