package com.side.dayv.subscribe.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class ResponseSubscribeDTO {

    private Long id;
    private String color;
    private SubscribeAuth auth;
    private LocalDateTime subscribeDate;
    private boolean showYn;

    @Builder
    public ResponseSubscribeDTO(final Long id, final String color
            , final SubscribeAuth auth, final boolean showYn
            , final LocalDateTime subscribeDate) {
        this.id = id;
        this.color = color;
        this.auth = auth;
        this.showYn = showYn;
        this.subscribeDate = subscribeDate;
    }
}
