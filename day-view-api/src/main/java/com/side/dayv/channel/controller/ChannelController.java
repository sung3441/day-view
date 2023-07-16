package com.side.dayv.channel.controller;

import com.side.dayv.channel.dto.request.CreateChannelDto;
import com.side.dayv.channel.dto.request.SearchChannelDto;
import com.side.dayv.channel.dto.request.UpdateChannelDto;
import com.side.dayv.channel.dto.response.ChannelResponseDto;
import com.side.dayv.channel.entity.Channel;
import com.side.dayv.channel.entity.ChannelSelectType;
import com.side.dayv.channel.service.ChannelService;
import com.side.dayv.global.response.CommonResponse;
import com.side.dayv.oauth.entity.CustomUser;
import com.side.dayv.subscribe.entity.Subscribers;
import com.side.dayv.subscribe.service.SubscribeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/channels")
@RequiredArgsConstructor
public class ChannelController {

    private final ChannelService channelService;
    private final SubscribeService subscribeService;

    @PostMapping
    public ResponseEntity<CommonResponse> save(@AuthenticationPrincipal final CustomUser user,
                               @RequestBody final CreateChannelDto request) {

        Channel saveChannel = channelService.save(user.getMemberId(), request);

        return ResponseEntity.ok(new CommonResponse(new ChannelResponseDto(saveChannel, saveChannel.getCreateMember(), true, 1L)));
    }

    @PutMapping("/{channelId}")
    public ResponseEntity<CommonResponse> update(@AuthenticationPrincipal final CustomUser user,
                                               @RequestBody final UpdateChannelDto request,
                                                 @PathVariable(name = "channelId") Long channelId) {

        channelService.update(user.getMemberId(), channelId, request);

        return ResponseEntity.ok(new CommonResponse("Success"));
    }

    @GetMapping("/{channelSelectType}")
    public ResponseEntity<CommonResponse> findMyChannels(@AuthenticationPrincipal final CustomUser user,
                                                                      @PathVariable final ChannelSelectType channelSelectType) {

        return ResponseEntity.ok(new CommonResponse(channelService.findMyChannels(user.getMemberId(), channelSelectType)));
    }

    @GetMapping
    public ResponseEntity<CommonResponse> findChannels(@AuthenticationPrincipal final CustomUser user,
                                                              final Pageable pageable,
                                                              final SearchChannelDto search) {

        return ResponseEntity.ok(new CommonResponse(channelService.findChannels(user.getMemberId(), pageable, search)));
    }

    @DeleteMapping("/{channelId}")
    public ResponseEntity removeChannel(@AuthenticationPrincipal final CustomUser user,
                                        @PathVariable final Long channelId){

        channelService.removeChannel(user.getMemberId(), channelId);
        return ResponseEntity.ok("");
    }

    @GetMapping("/{channelId}/members")
    public ResponseEntity getSubscribers(@AuthenticationPrincipal final CustomUser user,
                                                     @PathVariable final Long channelId) {
        Subscribers subscribers = subscribeService.getSubscribers(user.getMemberId(), channelId);
        return ResponseEntity.ok(new CommonResponse<>(subscribers));
    }
}
