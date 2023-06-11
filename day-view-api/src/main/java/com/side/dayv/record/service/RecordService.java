package com.side.dayv.record.service;

import com.side.dayv.channel.entity.Channel;
import com.side.dayv.channel.repository.ChannelRepository;
import com.side.dayv.global.exception.NotFoundException;
import com.side.dayv.record.dto.RequestCreateRecordDTO;
import com.side.dayv.record.dto.ResponseRecordDTO;
import com.side.dayv.record.entity.Record;
import com.side.dayv.record.repository.RecordRepository;
import com.side.dayv.subscribe.entity.Subscribe;
import com.side.dayv.subscribe.repository.SubscribeRepository;
import com.side.dayv.subscribe.service.SubscribeService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.side.dayv.global.util.ErrorMessage.*;

@Service
@RequiredArgsConstructor
public class RecordService {
    private final RecordRepository recordRepository;
    private final ChannelRepository channelRepository;
    private final SubscribeRepository subscribeRepository;

    @Transactional
    public void removeRecord(Long memberId, Long channelId, Long recordId){
        Subscribe subscribe = subscribeRepository.findByMemberIdAndChannelId(memberId, channelId)
                .orElseThrow(() -> new NotFoundException(SUBSCRIBE_NOT_FOUND));

        subscribe.checkManagerAuth();

        Record record = recordRepository.findByIdAndChannelId(recordId, channelId)
                .orElseThrow(() -> new NotFoundException(RECORD_NOT_FOUND));

        recordRepository.delete(record);
    }

    @Transactional
    public ResponseRecordDTO createRecord(RequestCreateRecordDTO recordDTO, Long channelId, Long memberId){
        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new NotFoundException(CHANNEL_NOT_FOUNT));

        Subscribe subscribe = subscribeRepository.findByMemberIdAndChannelId(memberId, channelId)
                .orElseThrow(() -> new NotFoundException(SUBSCRIBE_NOT_FOUND));

        subscribe.checkManagerAuth();

        Record record = recordRepository.save(recordDTO.toEntity(channel));

        return new ResponseRecordDTO(record);
    }
}
