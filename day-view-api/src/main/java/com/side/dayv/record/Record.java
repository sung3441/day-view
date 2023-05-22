package com.side.dayv.record;

import com.side.dayv.channel.entity.Channel;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Entity
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
    @Enumerated(EnumType.STRING)
    @Column(name = "complete")
    private RecordComplete complete;

    @NotNull
    @Column(name = "start_date")
    private LocalDateTime startDate;

    @NotNull
    @Column(name = "end_date")
    private LocalDateTime endDate;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id")
    @Column(name = "channel_id")
    private Channel channel;
}
