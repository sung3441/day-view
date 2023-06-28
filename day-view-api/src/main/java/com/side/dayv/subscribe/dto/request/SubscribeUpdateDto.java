package com.side.dayv.subscribe.dto.request;

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
}
