package com.side.dayv.record.dto;

import com.side.dayv.channel.entity.Channel;
import com.side.dayv.record.entity.Record;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class RequestUpdateRecordDTO {
    private String title;
    private String content;
    private boolean complete;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endDate;
    private String recordImageUrl;

    @Builder
    public RequestUpdateRecordDTO(String title, String content,
                                  LocalDateTime startDate, LocalDateTime endDate,
                                  String recordImageUrl, boolean complete){
        this.title = title;
        this.content = content;
        this.complete = complete;
        this.startDate = startDate;
        this.endDate = endDate;
        this.recordImageUrl = recordImageUrl;
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
                .build();
    }
}
