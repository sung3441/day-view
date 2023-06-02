package com.side.dayv.channel.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.side.dayv.channel.dto.response.ChannelResponseDto;

import java.util.List;

public interface ChannelRepositoryCustom {
    List<ChannelResponseDto> findMyChannels(Long memberId, BooleanExpression where, BooleanExpression on);
}
