package com.side.dayv.subscribe.controller;

import com.side.dayv.global.response.ApiResponse;
import com.side.dayv.subscribe.dto.request.SubscribeRequestDto;
import com.side.dayv.subscribe.service.SubscribeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/subscribes")
@RequiredArgsConstructor
public class SubscribeController {

    private final SubscribeService subscribeService;

    @PostMapping
    public ApiResponse subscribe(SubscribeRequestDto subscribeRequestDto) {
        subscribeService.subscribe(subscribeRequestDto);
        return ApiResponse.success();
    }
}
