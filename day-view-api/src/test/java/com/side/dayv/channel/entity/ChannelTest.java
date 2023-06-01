package com.side.dayv.channel.entity;

import com.side.dayv.member.entity.Member;
import com.side.dayv.oauth.entity.ProviderType;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class ChannelTest {

    @PersistenceContext
    EntityManager em;

    @Test
    void 채널_생성() {
        Member saveMember = Member.builder()
                .email("csi@test.com")
                .birthday("1985-12-30")
                .nickname("csi")
                .createdDate(LocalDateTime.now())
                .lastModifiedDate(LocalDateTime.now())
                .provider(ProviderType.GOOGLE)
                .profileImageUrl("")
                .build();

        em.persist(saveMember);

        Channel saveChannel = Channel.builder()
                .channelType(ChannelType.MY)
                .name("channel test")
                .secretYn(false)
                .createdDate(LocalDateTime.now())
                .lastModifiedDate(LocalDateTime.now())
                .member(saveMember)
                .build();

        em.persist(saveChannel);

        List<Channel> channelList = em.createQuery("select c from Channel c join fetch c.createMember m", Channel.class)
                .getResultList();

        assertThat(channelList).containsExactly(saveChannel);
        assertThat(channelList.get(0).getCreateMember()).isEqualTo(saveMember);
    }
}