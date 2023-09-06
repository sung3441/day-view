package com.side.dayv.subscribe.dto.request;

import com.side.dayv.subscribe.entity.SubscribeAuth;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SubscribeUpdateDto {

    private String color;

    private boolean showYn;

    private SubscribeAuth auth;
}
