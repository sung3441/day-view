package com.side.dayv.record.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.side.dayv.channel.entity.Channel;
import com.side.dayv.member.entity.Member;
import com.side.dayv.record.entity.Record;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ResponseRecordDTO {

    private Long recordId;
    private String title;
    private String content;

    private boolean complete;
    private boolean allDay;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endDate;
    private String recordImageUrl;

    public ResponseRecordDTO(Record record){
        this.recordId = record.getId();
        this.title = record.getTitle();
        this.content = record.getContent();
        this.startDate = record.getStartDate();
        this.endDate = record.getEndDate();
        this.recordImageUrl = record.getImageUrl();
        this.complete = record.isComplete();
        this.allDay = record.isAllDay();
    }
}
