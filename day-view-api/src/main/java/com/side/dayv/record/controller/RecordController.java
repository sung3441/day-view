package com.side.dayv.record.controller;

import com.side.dayv.global.response.CommonResponse;
import com.side.dayv.oauth.entity.CustomUser;
import com.side.dayv.record.dto.RequestCreateRecordDTO;
import com.side.dayv.record.dto.ResponseRecordDTO;
import com.side.dayv.record.service.RecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;

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

}
