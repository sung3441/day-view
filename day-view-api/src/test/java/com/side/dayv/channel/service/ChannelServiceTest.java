package com.side.dayv.channel.service;

import com.side.dayv.channel.dto.request.ChannelCreateDto;
import com.side.dayv.channel.entity.Channel;
import com.side.dayv.channel.entity.ChannelType;
import com.side.dayv.channel.repository.ChannelRepository;
import com.side.dayv.member.entity.Member;
import com.side.dayv.member.repository.MemberRepository;
import com.side.dayv.oauth.entity.ProviderType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class ChannelServiceTest {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    ChannelRepository channelRepository;

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
        assertThat(saveChannel.isSecretYn()).isFalse();
    }

    @Test
    void 비밀채널_등록() {
        ChannelCreateDto secret = ChannelCreateDto.builder()
                .name("비밀 채널 테스트")
                .secretYn(true)
                .build();

        Channel secretChannel = channelService.save(MEMBER.getId(), secret);

        assertThat(secretChannel.isSecretYn()).isTrue();
    }
}