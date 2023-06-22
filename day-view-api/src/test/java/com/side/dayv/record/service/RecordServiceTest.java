package com.side.dayv.record.service;

import com.side.dayv.channel.dto.request.ChannelCreateDto;
import com.side.dayv.channel.entity.Channel;
import com.side.dayv.channel.service.ChannelService;
import com.side.dayv.member.entity.Member;
import com.side.dayv.member.repository.MemberRepository;
import com.side.dayv.oauth.entity.ProviderType;
import com.side.dayv.record.dto.RequestCreateRecordDTO;
import com.side.dayv.record.dto.ResponseRecordDTO;
import com.side.dayv.record.entity.Record;
import com.side.dayv.record.repository.RecordRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class RecordServiceTest {

    @Autowired
    RecordService recordService;

    @Autowired
    RecordRepository recordRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    ChannelService channelService;

    Member MEMBER;

    Channel CHANNEL;

    ChannelCreateDto CREATE_CHANNEL_REQUEST;

    RequestCreateRecordDTO CREATE_RECORD_REQUEST;

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

        CREATE_CHANNEL_REQUEST = ChannelCreateDto.builder()
                .name("테스트 채널")
                .secretYn(false)
                .build();

        CHANNEL = channelService.save(MEMBER.getId(), CREATE_CHANNEL_REQUEST);

        CREATE_RECORD_REQUEST = RequestCreateRecordDTO.builder()
                .title("일정 생성")
                .content("내용 테스트")
                .startDate(LocalDateTime.of(2023, 5, 1, 10, 30))
                .endDate(LocalDateTime.of(2023, 5, 30, 10, 30))
                .build();
    }

    @Test
    void 일정_등록() {
        ResponseRecordDTO record = recordService.createRecord(CREATE_RECORD_REQUEST, MEMBER.getId(), CHANNEL.getId());

        assertThat(record.getTitle()).isEqualTo(CREATE_RECORD_REQUEST.getTitle());
        assertThat(record.getContent()).isEqualTo(CREATE_RECORD_REQUEST.getContent());
        assertThat(record.getStartDate()).isEqualTo(CREATE_RECORD_REQUEST.getStartDate());
        assertThat(record.getEndDate()).isEqualTo(CREATE_RECORD_REQUEST.getEndDate());
        assertThat(record.isComplete()).isFalse();
    }

    @Test
    void 일정_삭제() {
        ResponseRecordDTO record = recordService.createRecord(CREATE_RECORD_REQUEST, MEMBER.getId(), CHANNEL.getId());
        recordService.removeRecord(MEMBER.getId(), record.getRecordId());

        Optional<Record> optional = recordRepository.findById(record.getRecordId());
        assertThat(optional.isEmpty()).isTrue();
    }
}