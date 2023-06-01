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

    @Builder
    public ChannelResponseDto(Long id, String name, boolean secretYn, ChannelType channelType, Long creatorId, String creatorNickname) {
        this.id = id;
        this.name = name;
        this.secretYn = secretYn;
        this.channelType = channelType;
        this.creatorId = creatorId;
        this.creatorNickname = creatorNickname;
    }

    @QueryProjection
    public ChannelResponseDto(Channel channel, Member member) {
        this.id = channel.getId();
        this.name = channel.getName();
        this.secretYn = channel.isSecretYn();
        this.channelType = getChannelType();
        this.creatorId = member.getId();
        this.creatorNickname = member.getNickname();
    }
}
