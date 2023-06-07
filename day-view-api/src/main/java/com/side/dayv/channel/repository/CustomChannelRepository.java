package com.side.dayv.channel.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.side.dayv.channel.dto.request.ChannelSearchDto;
import com.side.dayv.channel.dto.response.ChannelResponseDto;
import com.side.dayv.channel.dto.response.ManageChannelResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CustomChannelRepository {
    List<ManageChannelResponseDto> findMyChannels(Long memberId, BooleanExpression where, BooleanExpression on);

    Page<ChannelResponseDto> findChannels(Long memberId, Pageable pageable, ChannelSearchDto search);
}
