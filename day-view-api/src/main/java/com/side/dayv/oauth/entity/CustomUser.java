package com.side.dayv.oauth.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public class CustomUser extends User {

    private Long memberId;

    public CustomUser(String username, String password,
                      Collection<? extends GrantedAuthority> authorities, Long memberId) {
        super(username, password, authorities);
        this.memberId = memberId;
    }

    public Long getMemberId(){
        return this.memberId;
    }
}
