package com.side.dayv.subscribe.entity;

import com.side.dayv.channel.entity.Channel;
import com.side.dayv.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
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

    public void changeAuthToManage() {
        this.auth = SubscribeAuth.MANAGE;
    }

    public void changeAuthToSubscribe() {
        this.auth = SubscribeAuth.SUBSCRIBE;
    }

    @Builder
    public Subscribe(SubscribeColor color, SubscribeAuth auth, LocalDateTime subscribeDate, Member subscriber, Channel channel) {
        this.color = color;
        this.auth = auth;
        this.subscribeDate = subscribeDate;
        this.subscriber = subscriber;
        this.channel = channel;
    }
}
