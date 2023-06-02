package com.side.dayv.channel.controller;

import com.side.dayv.channel.dto.request.ChannelCreateDto;
import com.side.dayv.channel.dto.response.ChannelResponseDto;
import com.side.dayv.channel.entity.Channel;
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
                "채널 저장에 성공했습니다.",
                new ChannelResponseDto(saveChannel, saveChannel.getCreateMember())
        );
    }

    @GetMapping("/manage")
    public ApiResponse<List<ChannelResponseDto>> findManageChannels(@AuthenticationPrincipal final CustomUser user) {
        return ApiResponse.success(
                "관리 채널 목록을 조회했습니다.",
                channelService.findManageChannels(user.getMemberId())
        );
    }

    @GetMapping("/subscribe")
    public ApiResponse<List<ChannelResponseDto>> findSubscribeChannels(@AuthenticationPrincipal final CustomUser user) {
        return ApiResponse.success(
                "구독 채널 목록을 조회했습니다.",
                channelService.findSubscribeChannels(user.getMemberId())
        );
    }

    @GetMapping("/google")
    public ApiResponse<List<ChannelResponseDto>> findGoogleChannels(@AuthenticationPrincipal final CustomUser user) {
        return ApiResponse.success(
                "구글 채널 목록을 조회했습니다.",
                channelService.findGoogleChannels(user.getMemberId())
        );
    }
}
