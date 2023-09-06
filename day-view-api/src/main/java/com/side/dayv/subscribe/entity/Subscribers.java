package com.side.dayv.subscribe.entity;


import com.side.dayv.global.exception.NotFoundException;
import com.side.dayv.member.entity.Member;

import java.util.List;
import java.util.stream.Collectors;

import static com.side.dayv.global.util.ErrorMessage.SUBSCRIBE_NOT_FOUND;

public class Subscribers {

    private List<Subscribe> subscribeList;

    public Subscribers(List<Subscribe> subscribeList){
        this.subscribeList = subscribeList;
    }

    public int getCount(){
        return subscribeList.size();
    }

    public List<ResponseSubscriberDTO> getSubscribers(){
        return subscribeList.stream()
                .map(s -> {
                    Member m = s.getMember();
                    return new ResponseSubscriberDTO(s.getId(), m.getNickname(), m.getEmail(), s.getAuth(), m.getProfileImageUrl());
                }).collect(Collectors.toList());
    }

    public boolean isManageAuth(Long memberId){
        return subscribeList.stream()
                .filter(s -> s.getMember().getId().equals(memberId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(SUBSCRIBE_NOT_FOUND))
                .isManageAuth();
    }
}
