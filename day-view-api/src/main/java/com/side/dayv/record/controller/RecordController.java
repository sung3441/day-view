package com.side.dayv.record.controller;

import com.side.dayv.global.response.ApiResponse;
import com.side.dayv.oauth.entity.CustomUser;
import com.side.dayv.record.dto.RequestCreateRecordDTO;
import com.side.dayv.record.service.RecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;

    @PostMapping(value = "/channels/{channelId}/records")
    public ApiResponse createRecord(@AuthenticationPrincipal final CustomUser user,
                                    @RequestBody final RequestCreateRecordDTO recordDTO,
                                    @PathVariable final Long channelId){

        recordService.createRecord(recordDTO, channelId, user.getMemberId());
        return ApiResponse.success();
    }

}
