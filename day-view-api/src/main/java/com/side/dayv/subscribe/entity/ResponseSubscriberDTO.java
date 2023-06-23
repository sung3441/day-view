package com.side.dayv.subscribe.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseSubscriberDTO {
    private String name;
    private String email;
    private SubscribeAuth auth;
    private String profileImageUrl;
}
