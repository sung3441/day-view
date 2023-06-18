package com.side.dayv.channel.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import com.side.dayv.channel.entity.Channel;
import com.side.dayv.channel.entity.ChannelType;
import com.side.dayv.subscribe.entity.Subscribe;
import com.side.dayv.subscribe.entity.SubscribeAuth;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class ManageChannelResponseDto {

    private Long channelId;

    private Long subscribeId;

    private String name;

    private boolean showYn;

    private String color;

    private ChannelType channelType;

    private SubscribeAuth subscribeAuth;

    @Builder
    public ManageChannelResponseDto(Long channelId, Long subscribeId, String name, boolean showYn, String color, ChannelType channelType, SubscribeAuth subscribeAuth) {
        this.channelId = channelId;
        this.subscribeId = subscribeId;
        this.name = name;
        this.showYn = showYn;
        this.color = color;
        this.channelType = channelType;
        this.subscribeAuth = subscribeAuth;
    }

    @QueryProjection
    public ManageChannelResponseDto(Channel channel, Subscribe subscribe) {
        this.channelId = channel.getId();
        this.subscribeId = subscribe.getId();
        this.name = channel.getName();
        this.showYn = subscribe.isShowYn();
        this.color = subscribe.getColor();
        this.channelType = channel.getType();
        this.subscribeAuth = subscribe.getAuth();
    }
}
