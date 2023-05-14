package com.side.dayv.member.entity;

import com.side.dayv.oauth.entity.ProviderType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "member")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id
    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "provider")
    @NonNull
    private ProviderType provider;

    @Column(name = "email")
    @NonNull
    private String email;

    @Column(name = "nickname")
    @NonNull
    private String nickname;

    @Column(name = "create_date")
    @NonNull
    private LocalDateTime createdDate;

    @Column(name = "last_modified_date")
    @NonNull
    private LocalDateTime lastModifiedDate;

    @Column(name = "profile_image_url")
    @NonNull
    private String profileImageUrl;

    @Column(name = "birthday")
    @NonNull
    private LocalDate birthday;

    @Column(name = "refresh_token")
    @NonNull
    private String refreshToken;

    @Builder
    public Member(String email
            , String nickname
            , ProviderType provider
            , LocalDateTime createdDate
            , LocalDateTime lastModifiedDate
            , String profileImageUrl
            , LocalDate birthday
            , String refreshToken) {
        this.email = email;
        this.nickname = nickname;
        this.createdDate = createdDate;
        this.lastModifiedDate = lastModifiedDate;
        this.profileImageUrl = profileImageUrl;
        this.birthday = birthday;
        this.refreshToken = refreshToken;
    }

    public void changeNickName(String nickname){
        this.nickname = nickname;
    }

    public void changeProfileImageUrl(String profileImageUrl){
        this.profileImageUrl = profileImageUrl;
    }

    public void changeRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}