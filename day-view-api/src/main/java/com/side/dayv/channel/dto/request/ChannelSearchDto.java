package com.side.dayv.channel.dto.request;

import com.side.dayv.channel.entity.ChannelOrderType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChannelSearchDto {

    private String keyword;

    private ChannelOrderType order;
}
