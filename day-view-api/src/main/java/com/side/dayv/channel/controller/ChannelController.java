package com.side.dayv.channel.controller;

import com.side.dayv.channel.dto.request.ChannelCreateDto;
import com.side.dayv.channel.dto.request.ChannelSearchDto;
import com.side.dayv.channel.dto.response.ChannelResponseDto;
import com.side.dayv.channel.entity.Channel;
import com.side.dayv.channel.entity.ChannelSelectType;
import com.side.dayv.channel.service.ChannelService;
import com.side.dayv.global.response.CommonResponse;
import com.side.dayv.member.entity.Member;
import com.side.dayv.member.service.MemberService;
import com.side.dayv.oauth.entity.CustomUser;
import com.side.dayv.subscribe.entity.Subscribe;
import com.side.dayv.subscribe.entity.SubscribeAuth;
import com.side.dayv.subscribe.entity.Subscribers;
import com.side.dayv.subscribe.service.SubscribeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/channels")
@RequiredArgsConstructor
public class ChannelController {

    private final ChannelService channelService;
    private final SubscribeService subscribeService;

    @PostMapping
    public ResponseEntity<CommonResponse> save(@AuthenticationPrincipal final CustomUser user,
                               @RequestBody final ChannelCreateDto request) {

        Channel saveChannel = channelService.save(user.getMemberId(), request);

        return ResponseEntity.ok(new CommonResponse(new ChannelResponseDto(saveChannel, saveChannel.getCreateMember(), true, 1L)));
    }

    @GetMapping("/{channelSelectType}")
    public ResponseEntity<CommonResponse> findMyChannels(@AuthenticationPrincipal final CustomUser user,
                                                                      @PathVariable final ChannelSelectType channelSelectType) {

        return ResponseEntity.ok(new CommonResponse(channelService.findMyChannels(user.getMemberId(), channelSelectType)));
    }

    @GetMapping
    public ResponseEntity<CommonResponse> findChannels(@AuthenticationPrincipal final CustomUser user,
                                                              final Pageable pageable,
                                                              ChannelSearchDto search) {

        return ResponseEntity.ok(new CommonResponse(channelService.findChannels(user.getMemberId(), pageable, search)));
    }

    @DeleteMapping("/{channelId}")
    public ResponseEntity removeChannel(@AuthenticationPrincipal final CustomUser user,
                                        @PathVariable final Long channelId){

        channelService.removeChannel(user.getMemberId(), channelId);
        return ResponseEntity.ok("");
    }

    @GetMapping("/{channelId}/members")
    public ResponseEntity findMemberByChannelAndAuth(@AuthenticationPrincipal final CustomUser user,
                                                     @PathVariable final Long channelId){
        Subscribers subscribers = subscribeService.getSubscribers(channelId);
        return ResponseEntity.ok(new CommonResponse<>(subscribers));
    }
}
