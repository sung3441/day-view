package com.side.dayv.subscribe.dto.request;

import com.side.dayv.channel.entity.Channel;
import com.side.dayv.member.entity.Member;
import com.side.dayv.subscribe.entity.Subscribe;
import com.side.dayv.subscribe.entity.SubscribeAuth;
import com.side.dayv.subscribe.entity.SubscribeColor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SubscribeUpdateDto {

    private SubscribeColor color;

    private boolean showYn;
}
