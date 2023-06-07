package com.side.dayv.record.dto;

import com.side.dayv.record.entity.Record;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ResponseRecordDTO {

    private String title;
    private String content;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endDate;
    private String recordImageUrl;

    public ResponseRecordDTO(Record record){
        this.title = record.getTitle();
        this.content = record.getTitle();
        this.startDate = record.getStartDate();
        this.endDate = record.getEndDate();
        this.recordImageUrl = record.getImageUrl();
    }
}