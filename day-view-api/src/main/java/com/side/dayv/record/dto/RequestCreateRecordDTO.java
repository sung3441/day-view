package com.side.dayv.record.dto;

import com.side.dayv.channel.entity.Channel;
import com.side.dayv.record.entity.Record;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class RequestCreateRecordDTO {

    private String title;
    private String content;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endDate;
    private String recordImageUrl;
    private boolean allDay;

    @Builder
    public RequestCreateRecordDTO(String title, String content,
                                  LocalDateTime startDate, LocalDateTime endDate,
                                  String recordImageUrl, boolean allDay){
        this.title = title;
        this.content = content;
        this.startDate = startDate;
        this.endDate = endDate;
        this.recordImageUrl = recordImageUrl;
        this.allDay = allDay;
    }

    public Record toEntity(Channel channel) {
        return Record.builder()
                .title(title)
                .content(content)
                .complete(false)
                .imageUrl(recordImageUrl)
                .startDate(startDate)
                .endDate(endDate)
                .channel(channel)
                .allDay(allDay)
                .build();
    }
}
