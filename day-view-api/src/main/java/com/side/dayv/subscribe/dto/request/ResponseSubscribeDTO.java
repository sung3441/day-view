package com.side.dayv.subscribe.dto.request;

import com.side.dayv.subscribe.entity.Subscribe;
import com.side.dayv.subscribe.entity.SubscribeAuth;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ResponseSubscribeDTO {

    public ResponseSubscribeDTO(Subscribe subscribe){
        this.id = subscribe.getId();
        this.color = subscribe.getColor();
        this.auth = subscribe.getAuth();
        this.showYn = subscribe.isShowYn();
        this.subscribeDate = subscribe.getSubscribeDate();
    }

    private Long id;
    private String color;
    private SubscribeAuth auth;
    private LocalDateTime subscribeDate;
    private boolean showYn;

}
