package com.side.dayv.subscribe.entity;


import com.side.dayv.member.entity.Member;

import java.util.List;
import java.util.stream.Collectors;

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
                    return new ResponseSubscriberDTO(m.getNickname(), m.getEmail(), s.getAuth(), m.getProfileImageUrl());
                }).collect(Collectors.toList());
    }
}
