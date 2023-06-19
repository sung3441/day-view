package com.side.dayv.record.service;

import com.side.dayv.channel.entity.Channel;
import com.side.dayv.channel.repository.ChannelRepository;
import com.side.dayv.global.exception.BadRequestException;
import com.side.dayv.global.exception.NotFoundException;
import com.side.dayv.record.dto.RequestCreateRecordDTO;
import com.side.dayv.record.dto.RequestUpdateRecordDTO;
import com.side.dayv.record.dto.ResponseRecordDTO;
import com.side.dayv.record.entity.Record;
import com.side.dayv.record.repository.RecordRepository;
import com.side.dayv.subscribe.entity.Subscribe;
import com.side.dayv.subscribe.repository.SubscribeRepository;
import com.side.dayv.subscribe.service.SubscribeService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.side.dayv.global.util.ErrorMessage.*;

@Service
@RequiredArgsConstructor
public class RecordService {
    private final RecordRepository recordRepository;
    private final ChannelRepository channelRepository;
    private final SubscribeRepository subscribeRepository;

    @Transactional
    public void removeRecord(Long memberId, Long recordId){
        Record record = recordRepository.findById(recordId)
                .orElseThrow(() -> new NotFoundException(RECORD_NOT_FOUND));

        Subscribe subscribe = subscribeRepository.findByMemberIdAndChannelId(memberId, record.getChannel().getId())
                .orElseThrow(() -> new NotFoundException(SUBSCRIBE_NOT_FOUND));

        if( !subscribe.isManageAuth() ){
            throw new BadRequestException(MODIFY_NO_PERMISSION);
        }

        recordRepository.delete(record);
    }

    @Transactional
    public ResponseRecordDTO createRecord(RequestCreateRecordDTO recordDTO, Long memberId, Long channelId){
        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new NotFoundException(CHANNEL_NOT_FOUNT));

        Subscribe subscribe = subscribeRepository.findByMemberIdAndChannelId(memberId, channelId)
                .orElseThrow(() -> new NotFoundException(SUBSCRIBE_NOT_FOUND));

        if( !subscribe.isManageAuth() ){
            throw new BadRequestException(MODIFY_NO_PERMISSION);
        }

        Record record = recordRepository.save(recordDTO.toEntity(channel));

        return new ResponseRecordDTO(record);
    }

    @Transactional
    public ResponseRecordDTO updateRecord(RequestUpdateRecordDTO recordDTO, Long memberId, Long recordId){

        Record record = recordRepository.findById(recordId)
                .orElseThrow(() -> new NotFoundException(RECORD_NOT_FOUND));

        Subscribe subscribe = subscribeRepository.findByMemberIdAndChannelId(memberId, record.getChannel().getId())
                .orElseThrow(() -> new NotFoundException(SUBSCRIBE_NOT_FOUND));

        if( !subscribe.isManageAuth() ){
            throw new BadRequestException(MODIFY_NO_PERMISSION);
        }

        record.update(recordDTO);
        return new ResponseRecordDTO(record);
    }

    @Transactional
    public ResponseRecordDTO getRecord(Long recordId){
        Record record = recordRepository.findById(recordId)
                .orElseThrow(() -> new NotFoundException(RECORD_NOT_FOUND));

        return new ResponseRecordDTO(record);
    }

    @Transactional
    public List<ResponseRecordDTO> getChannelRecord(Long channelId) {
        return recordRepository.findByChannelId(channelId)
                .stream()
                .map(record -> new ResponseRecordDTO(record))
                .collect(Collectors.toList());
    }
}
