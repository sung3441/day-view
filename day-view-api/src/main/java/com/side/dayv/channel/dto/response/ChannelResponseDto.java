package com.side.dayv.channel.dto.response;

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

    private String password;

    private ChannelType channelType;

    private Long creatorId;

    private String creatorNickname;

    @Builder
    public ChannelResponseDto(Long id, String name, boolean secretYn, String password, ChannelType channelType, Long creatorId, String creatorNickname) {
        this.id = id;
        this.name = name;
        this.secretYn = secretYn;
        this.password = password;
        this.channelType = channelType;
        this.creatorId = creatorId;
        this.creatorNickname = creatorNickname;
    }

    public static ChannelResponseDto create(Channel channel, Member member) {
        return ChannelResponseDto.builder()
                .id(channel.getId())
                .name(channel.getName())
                .secretYn(channel.isSecretYn())
                .password(channel.getPassword())
                .channelType(channel.getType())
                .creatorId(member.getId())
                .creatorNickname(member.getNickname())
                .build();
    }
}
