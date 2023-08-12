package com.side.dayv.record.entity;

import com.side.dayv.channel.entity.Channel;
import com.side.dayv.record.dto.RequestUpdateRecordDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
public class Record {

    @Id @GeneratedValue
    @Column(name = "record_id")
    private Long id;

    @NotNull
    private String title;

    @NotNull
    private String content;

    @Column(name = "record_image_url")
    private String imageUrl;

    @NotNull
    @Column(name = "complete")
    private boolean complete;

    @NotNull
    @Column(name = "is_all_day")
    private boolean allDay;

    @NotNull
    @Column(name = "start_date")
    private LocalDateTime startDate;

    @NotNull
    @Column(name = "end_date")
    private LocalDateTime endDate;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id")
    private Channel channel;

    @Builder
    public Record(String title, String content,
                  String imageUrl , boolean complete,
                  LocalDateTime startDate, LocalDateTime endDate,
                  Channel channel, boolean allDay){
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
        this.complete = complete;
        this.startDate = startDate;
        this.endDate = endDate;
        this.channel = channel;
        this.allDay = allDay;
    }

    public void update(RequestUpdateRecordDTO recordDTO){
        this.title = recordDTO.getTitle();
        this.content = recordDTO.getContent();
        this.complete = recordDTO.isComplete();
        this.startDate = recordDTO.getStartDate();
        this.endDate = recordDTO.getEndDate();
        this.imageUrl = recordDTO.getRecordImageUrl();
    }
}
