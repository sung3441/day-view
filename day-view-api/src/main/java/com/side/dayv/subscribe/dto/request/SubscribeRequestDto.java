package com.side.dayv.subscribe.dto.request;

import com.side.dayv.channel.entity.Channel;
import com.side.dayv.member.entity.Member;
import com.side.dayv.subscribe.entity.Subscribe;
import com.side.dayv.subscribe.entity.SubscribeAuth;
import com.side.dayv.subscribe.entity.SubscribeColor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SubscribeRequestDto {

    private Long memberId;

    private Long channelId;

    public Subscribe toEntity(Member member, Channel channel) {
        return Subscribe.builder()
                .channel(channel)
                .subscriber(member)
                .color(SubscribeColor.YELLOW)
                .auth(SubscribeAuth.SUBSCRIBE)
                .subscribeDate(LocalDateTime.now())
                .build();
    }
}
