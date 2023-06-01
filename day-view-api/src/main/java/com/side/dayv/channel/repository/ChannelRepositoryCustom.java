package com.side.dayv.channel.repository;

import com.side.dayv.channel.dto.response.ChannelResponseDto;

import java.util.List;

public interface ChannelRepositoryCustom {
    List<ChannelResponseDto> findManageChannels(Long memberId);
    List<ChannelResponseDto> findSubscribeChannels(Long memberId);
    List<ChannelResponseDto> findGoogleChannels(Long memberId);
}
