package com.side.dayv.subscribe.entity;

import com.side.dayv.channel.entity.Channel;
import com.side.dayv.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Entity
public class Subscribe {

    @Id @GeneratedValue
    @Column(name = "subscribe_id")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "subscribe_color")
    private SubscribeColor color;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "subscribe_auth")
    private SubscribeAuth auth;

    @NotNull
    @Column(name = "subscribe_date")
    private LocalDateTime subscribeDate;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member subscriber;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id")
    private Channel channel;
}
