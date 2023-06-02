package com.side.dayv.channel.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import com.side.dayv.channel.entity.Channel;
import com.side.dayv.channel.entity.ChannelType;
import com.side.dayv.member.entity.Member;
import lombok.Builder;
import lombok.Data;

@Data
public class ChannelResponseDto {

    private Long id;

    private String name;

    private boolean secretYn;

    private ChannelType channelType;

    private Long creatorId;

    private String creatorNickname;

    private Long subscriberCount;

    @Builder
    public ChannelResponseDto(Long id, String name, ChannelType channelType, Long creatorId, String creatorNickname, Long subscriberCount) {
        this.id = id;
        this.name = name;
        this.channelType = channelType;
        this.creatorId = creatorId;
        this.creatorNickname = creatorNickname;
        this.subscriberCount = subscriberCount;
    }

    @QueryProjection
    public ChannelResponseDto(Channel channel, Member member, Long subscriberCount) {
        this.id = channel.getId();
        this.name = channel.getName();
        this.channelType = channel.getType();
        this.creatorId = member.getId();
        this.creatorNickname = member.getNickname();
        this.subscriberCount = subscriberCount;
    }
}
