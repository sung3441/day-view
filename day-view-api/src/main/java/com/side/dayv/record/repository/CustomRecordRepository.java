package com.side.dayv.record.repository;

import com.side.dayv.record.dto.RequestSearchRecordDTO;
import com.side.dayv.record.dto.ResponseScheduleRecordDTO;
import com.side.dayv.record.entity.Record;

import java.util.List;

public interface CustomRecordRepository {

    public List<ResponseScheduleRecordDTO> getRecordOfSubscribedChannels(Long userId, RequestSearchRecordDTO searchRecordDTO);
}
