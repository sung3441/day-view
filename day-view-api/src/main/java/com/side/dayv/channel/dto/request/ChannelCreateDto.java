package com.side.dayv.channel.dto.request;

import com.side.dayv.channel.entity.Channel;
import com.side.dayv.channel.entity.ChannelType;
import com.side.dayv.member.entity.Member;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChannelCreateDto {

    private String name;

    private boolean secretYn;

    private String password;

    public Channel toEntity(Member member) {
        LocalDateTime now = LocalDateTime.now();

        return Channel.builder()
                .name(this.name)
                .member(member)
                .channelType(ChannelType.CUSTOM)
                .secretYn(this.secretYn)
                .password(this.password)
                .createdDate(now)
                .lastModifiedDate(now)
                .build();
    }
}
