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
    @Column(name = "subscribe_color")
    private String color;

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

    public static final String DEFAULT_COLOR = "rgba(228, 192, 51)"; // 노랑색

    public void changeAuthToManage() {
        this.auth = SubscribeAuth.MANAGE;
    }

    public void changeAuthToSubscribe() {
        this.auth = SubscribeAuth.SUBSCRIBE;
    }

    public void changeAuth(final SubscribeAuth auth){
        this.auth = auth;
    }

    public void changeColor(final String color) {
        if (color != null) {
            this.color = color;
        }
    }

    public void changeShowYn(final boolean showYn) {
        this.showYn = showYn;
    }

    @Builder
    public Subscribe(final String color, final SubscribeAuth auth, final boolean showYn,
                     final LocalDateTime subscribeDate, final Member member, final Channel channel) {
        this.color = color;
        this.auth = auth;
        this.showYn = showYn;
        this.subscribeDate = subscribeDate;
        this.member = member;
        this.channel = channel;
    }

    public Subscribe(final Member member, final Channel channel) {
        this.color = DEFAULT_COLOR;
        this.auth = SubscribeAuth.SUBSCRIBE;
        this.showYn = true;
        this.subscribeDate = LocalDateTime.now();
        this.member = member;
        this.channel = channel;
    }

    public boolean isManageAuth(){
        return this.auth == SubscribeAuth.MANAGE;
    }

    public boolean isSameMember(final Long memberId) {
        return this.member.getId() == memberId;
    }

    public void update(final String color, final boolean showYn, final SubscribeAuth auth) {
        changeColor(color);
        changeShowYn(showYn);
        changeAuth(auth);
    }

    public static Subscribe createManageChannelSubscribe(final Member member, final Channel channel) {
        return Subscribe.builder()
                .color(DEFAULT_COLOR)
                .auth(SubscribeAuth.MANAGE)
                .showYn(true)
                .subscribeDate(LocalDateTime.now())
                .member(member)
                .channel(channel)
                .build();
    }
}
