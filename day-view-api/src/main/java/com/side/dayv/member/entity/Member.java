package com.side.dayv.member.entity;

import com.side.dayv.member.dto.RequestMemberDTO;
import com.side.dayv.oauth.entity.ProviderType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "member")
public class Member {

    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "provider")
    @Enumerated(EnumType.STRING)
    @NotNull
    private ProviderType provider;

    @Column(name = "email")
    private String email;

    @Column(name = "nickname")
    @NotNull
    private String nickname;

    @Column(name = "create_date")
    @NotNull
    private LocalDateTime createdDate;

    @Column(name = "last_modified_date")
    @NotNull
    private LocalDateTime lastModifiedDate;

    @Column(name = "profile_image_url")
    @NotNull
    private String profileImageUrl;

    @Column(name = "birthday")
    private String birthday;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Builder
    public Member(String email
            , String nickname
            , ProviderType provider
            , LocalDateTime createdDate
            , LocalDateTime lastModifiedDate
            , String profileImageUrl
            , String birthday
            , String refreshToken) {
        this.email = email;
        this.nickname = nickname;
        this.createdDate = createdDate;
        this.lastModifiedDate = lastModifiedDate;
        this.profileImageUrl = profileImageUrl;
        this.birthday = birthday;
        this.refreshToken = refreshToken;
        this.provider = provider;
    }

    public void changeNickName(String nickname) {
        this.nickname = nickname;
    }

    public void changeProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public void changeRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void changeMyInfo(RequestMemberDTO requestMemberDTO){
        this.nickname = requestMemberDTO.getNickname();
        this.birthday = requestMemberDTO.getBirthday();
        this.profileImageUrl = requestMemberDTO.getProfileImageUrl();
    }
}
