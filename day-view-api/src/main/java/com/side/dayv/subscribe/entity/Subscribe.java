package com.side.dayv.subscribe.entity;

import com.side.dayv.channel.entity.Channel;
import com.side.dayv.global.exception.BadRequestException;
import com.side.dayv.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static com.side.dayv.global.util.ErrorMessage.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    @Column(name = "showYn")
    private boolean showYn;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

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

    public void changeColor(final SubscribeColor color) {
        if (color != null) {
            this.color = color;
        }
    }

    public void changeShowYn(final boolean showYn) {
        this.showYn = showYn;
    }

    @Builder
    public Subscribe(final SubscribeColor color, final SubscribeAuth auth, final boolean showYn,
                     final LocalDateTime subscribeDate, final Member member, final Channel channel) {
        this.color = color;
        this.auth = auth;
        this.showYn = showYn;
        this.subscribeDate = subscribeDate;
        this.member = member;
        this.channel = channel;
    }

    public Subscribe(final Member member, final Channel channel) {
        this.color = SubscribeColor.YELLOW;
        this.auth = SubscribeAuth.SUBSCRIBE;
        this.showYn = true;
        this.subscribeDate = LocalDateTime.now();
        this.member = member;
        this.channel = channel;
    }

    public void checkUnsubscribeAuth() {
        if (this.auth == SubscribeAuth.MANAGE) {
            throw new BadRequestException(BAD_REQUEST_MANAGE_UNSUBSCRIBE);
        }
    }

    public void checkPermission(final Long memberId) {
        if (this.member.getId() != memberId) {
            throw new BadRequestException(BAD_REQUEST_PERMISSION);
        }
    }

    public void update(final SubscribeColor color, final boolean showYn) {
        changeColor(color);
        changeShowYn(showYn);
    }

    public static Subscribe createManageChannelSubscribe(final Member member, final Channel channel) {
        return Subscribe.builder()
                .color(SubscribeColor.YELLOW)
                .auth(SubscribeAuth.MANAGE)
                .showYn(true)
                .subscribeDate(LocalDateTime.now())
                .member(member)
                .channel(channel)
                .build();
    }
}
