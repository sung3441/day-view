package com.side.dayv.channel.dto.request;

import com.side.dayv.channel.entity.Channel;
import com.side.dayv.channel.entity.ChannelType;
import com.side.dayv.member.entity.Member;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CreateChannelDto {

    private String name;

    private boolean secretYn;

    @Builder
    public CreateChannelDto(String name, boolean secretYn) {
        this.name = name;
        this.secretYn = secretYn;
    }

    public Channel toEntity(Member member) {
        LocalDateTime now = LocalDateTime.now();
        ChannelType channelType = secretYn ? ChannelType.SECRET : ChannelType.CUSTOM;

        return Channel.builder()
                .name(this.name)
                .member(member)
                .channelType(channelType)
                .createdDate(now)
                .lastModifiedDate(now)
                .build();
    }
}
