package com.side.dayv.channel.dto.request;

import com.side.dayv.channel.entity.ChannelOrderType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchChannelDto {

    private String keyword;

    private ChannelOrderType order;
}
