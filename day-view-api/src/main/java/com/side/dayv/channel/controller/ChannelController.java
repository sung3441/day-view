package com.side.dayv.channel.controller;

import com.side.dayv.channel.dto.request.ChannelCreateDto;
import com.side.dayv.channel.dto.response.ChannelResponseDto;
import com.side.dayv.channel.entity.Channel;
import com.side.dayv.channel.entity.ChannelSelectType;
import com.side.dayv.channel.service.ChannelService;
import com.side.dayv.global.response.ApiResponse;
import com.side.dayv.oauth.entity.CustomUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/channels")
@RequiredArgsConstructor
public class ChannelController {

    private final ChannelService channelService;

    @PostMapping
    public ApiResponse<ChannelResponseDto> save(@AuthenticationPrincipal final CustomUser user,
                                                @RequestBody final ChannelCreateDto request) {

        Channel saveChannel = channelService.save(user.getMemberId(), request);

        return ApiResponse.success(
                "channel",
                new ChannelResponseDto(saveChannel, saveChannel.getCreateMember(), 1L)
        );
    }

    @GetMapping("/{channelSelectType}")
    public ApiResponse<List<ChannelResponseDto>> findMyChannels(@AuthenticationPrincipal final CustomUser user,
                                                                @PathVariable final ChannelSelectType channelSelectType) {

        return ApiResponse.success(
                channelSelectType.getKey(),
                channelService.findMyChannels(user.getMemberId(), channelSelectType)
        );
    }
}
