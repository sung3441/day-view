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
public class ChannelCreateDto {

    private String name;

    private boolean secretYn;

    @Builder
    public ChannelCreateDto(String name, boolean secretYn) {
        this.name = name;
        this.secretYn = secretYn;
    }

    public Channel toEntity(Member member) {
        LocalDateTime now = LocalDateTime.now();

        return Channel.builder()
                .name(this.name)
                .member(member)
                .channelType(ChannelType.CUSTOM)
                .secretYn(this.secretYn)
                .createdDate(now)
                .lastModifiedDate(now)
                .build();
    }
}
