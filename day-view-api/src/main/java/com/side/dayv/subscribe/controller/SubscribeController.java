package com.side.dayv.subscribe.controller;

import com.side.dayv.global.response.ApiResponse;
import com.side.dayv.oauth.entity.CustomUser;
import com.side.dayv.subscribe.dto.request.SubscribeUpdateDto;
import com.side.dayv.subscribe.service.SubscribeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SubscribeController {

    private final SubscribeService subscribeService;

    @PostMapping("/channels/{channelId}/subscribes")
    public ApiResponse subscribe(@AuthenticationPrincipal final CustomUser user, @PathVariable final Long channelId) {
        subscribeService.subscribe(user.getMemberId(), channelId);
        return ApiResponse.success();
    }

    @DeleteMapping("/channels/{channelId}/subscribes")
    public ApiResponse unsubscribe(@AuthenticationPrincipal final CustomUser user, @PathVariable final Long channelId) {
        subscribeService.unsubscribe(user.getMemberId(), channelId);
        return ApiResponse.success();
    }

    @PatchMapping("/subscribes/{subscribeId}")
    public ApiResponse update(@AuthenticationPrincipal final CustomUser user,
                              @PathVariable final Long subscribeId, @RequestBody SubscribeUpdateDto request) {
        subscribeService.update(subscribeId, user.getMemberId(), request);
        return ApiResponse.success();
    }
}
