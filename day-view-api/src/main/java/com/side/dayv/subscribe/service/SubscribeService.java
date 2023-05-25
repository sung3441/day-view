package com.side.dayv.subscribe.service;

import com.side.dayv.subscribe.dto.request.SubscribeRequestDto;
import com.side.dayv.subscribe.entity.Subscribe;

public interface SubscribeService {
    Subscribe subscribe(SubscribeRequestDto subscribeRequestDto);

    void unsubscribe(Long subscribeId, String email);
}
