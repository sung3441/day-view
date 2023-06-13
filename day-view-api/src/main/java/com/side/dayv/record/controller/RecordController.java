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

        ResponseRecordDTO responseRecordDTO = recordService.createRecord(recordDTO, user.getMemberId(), channelId);

        return ResponseEntity.ok(new CommonResponse(responseRecordDTO));
    }

    @DeleteMapping(value = "/records/{recordId}")
    public ResponseEntity removeRecord(@AuthenticationPrincipal final CustomUser user,
                                       @PathVariable final Long recordId){
        recordService.removeRecord(user.getMemberId(), recordId);

        return ResponseEntity.ok("");
    }

    @PatchMapping(value = "/records/{recordId}")
    public ResponseEntity updateRecord(@AuthenticationPrincipal final CustomUser user,
                                       @PathVariable final Long recordId,
                                       @RequestBody RequestUpdateRecordDTO recordDTO){

        ResponseRecordDTO responseRecordDTO = recordService.updateRecord(recordDTO, user.getMemberId(), recordId);
        return ResponseEntity.ok(new CommonResponse(responseRecordDTO));
    }

}
