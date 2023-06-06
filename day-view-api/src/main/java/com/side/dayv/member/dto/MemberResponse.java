package com.side.dayv.member.dto;

import com.side.dayv.oauth.entity.ProviderType;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class MemberResponse {

    private Long memberId;
    private ProviderType provider;
    private String email;
    private String nickname;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime lastModifiedDate;

    private String profileImageUrl;
    private String birthday;
    private String accessToken;
    private String refreshToken;

    @Builder
    public MemberResponse(Long memberId, ProviderType provider,
                          String email, String nickname,
                          LocalDateTime createdDate, LocalDateTime lastModifiedDate,
                          String profileImageUrl, String birthday,
                          String accessToken, String refreshToken){
        this.memberId = memberId;
        this.provider = provider;
        this.email = email;
        this.nickname = nickname;
        this.createdDate = createdDate;
        this.lastModifiedDate = lastModifiedDate;
        this.profileImageUrl = profileImageUrl;
        this.birthday = birthday;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
