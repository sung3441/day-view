package com.side.dayv.record.controller;

import com.side.dayv.global.response.CommonResponse;
import com.side.dayv.oauth.entity.CustomUser;
import com.side.dayv.record.dto.RequestUpdateRecordDTO;
import com.side.dayv.record.dto.RequestCreateRecordDTO;
import com.side.dayv.record.dto.ResponseRecordDTO;
import com.side.dayv.record.service.RecordService;
import com.side.dayv.subscribe.service.SubscribeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;
    private final SubscribeService subscribeService;

    @PostMapping(value = "/channels/{channelId}/records")
    public ResponseEntity createRecord(@AuthenticationPrincipal final CustomUser user,
                                       @RequestBody final RequestCreateRecordDTO recordDTO,
                                       @PathVariable final Long channelId){

        ResponseRecordDTO responseRecordDTO = recordService.createRecord(recordDTO, channelId, user.getMemberId());

        return ResponseEntity.ok(new CommonResponse(responseRecordDTO));
    }

    @DeleteMapping(value = "/channels/{channelId}/records/{recordsId}")
    public ResponseEntity removeRecord(@AuthenticationPrincipal final CustomUser user,
                                       @PathVariable final Long channelId,
                                       @PathVariable final Long recordsId){
        recordService.removeRecord(user.getMemberId(), channelId, recordsId);

        return ResponseEntity.ok("");
    }

    @PatchMapping(value = "/channels/{channelId}/records/{recordId}")
    public ResponseEntity updateRecord(@AuthenticationPrincipal final CustomUser user,
                                       @PathVariable final Long channelId,
                                       @PathVariable final Long recordId,
                                       @RequestBody RequestUpdateRecordDTO recordDTO){

        subscribeService.checkManageAuth(user.getMemberId(), channelId);

        ResponseRecordDTO responseRecordDTO = recordService.updateRecord(recordDTO, channelId, recordId);
        return ResponseEntity.ok(new CommonResponse(responseRecordDTO));
    }

}
