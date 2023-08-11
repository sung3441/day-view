package com.side.dayv.record.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.side.dayv.channel.entity.Channel;
import com.side.dayv.record.entity.Record;
import com.side.dayv.subscribe.entity.Subscribe;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
public class ResponseScheduleRecordDTO {

    private Long recordId;
    private String title;
    private String content;
    private boolean complete;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endDate;
    private String recordImageUrl;

    private String color;

    private String channelName;
    private Long subscribeId;
    private Long channelId;

    @QueryProjection
    public ResponseScheduleRecordDTO(Record record, Channel channel, Subscribe subscribe) {
        this.recordId = record.getId();
        this.title = record.getTitle();
        this.content = record.getContent();
        this.startDate = record.getStartDate();
        this.endDate = record.getEndDate();
        this.recordImageUrl = record.getImageUrl();
        this.complete = record.isComplete();
        this.color = subscribe.getColor();
        this.channelName = channel.getName();
        this.channelId = channel.getId();
        this.subscribeId = subscribe.getId();
    }
}
