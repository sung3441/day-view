package com.side.dayv.oauth.service;

import com.side.dayv.member.entity.Member;
import com.side.dayv.member.repository.MemberRepository;
import com.side.dayv.oauth.entity.MemberPrincipal;
import com.side.dayv.oauth.exception.OAuthProviderMissMatchException;
import com.side.dayv.oauth.info.OAuth2UserInfo;
import com.side.dayv.oauth.entity.ProviderType;
import com.side.dayv.oauth.info.OAuth2UserInfoFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException{
        OAuth2User user = super.loadUser(userRequest);

        try {
            return this.process(userRequest, user);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User process(OAuth2UserRequest userRequest, OAuth2User user) {
        ProviderType providerType = ProviderType.valueOf(userRequest.getClientRegistration().getRegistrationId().toUpperCase());

        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());
        Member savedUser = memberRepository.findByEmail(userInfo.getEmail());

        if (savedUser != null) {
            if (providerType != savedUser.getProvider()) {
                throw new OAuthProviderMissMatchException(
                        "Looks like you're signed up with " + providerType +
                                " account. Please use your " + savedUser.getProvider() + " account to login."
                );
            }
            updateUser(savedUser, userInfo);
        } else {
            savedUser = createUser(userInfo, providerType);
        }

        return MemberPrincipal.create(savedUser, user.getAttributes());
    }

    private Member createUser(OAuth2UserInfo userInfo, ProviderType providerType) {
        LocalDateTime now = LocalDateTime.now();

        Member user = new Member(
                userInfo.getEmail(),
                userInfo.getName(),
                providerType,
                now,
                now,
                userInfo.getImageUrl(),
                null,
                null
        );
        return memberRepository.saveAndFlush(user);
    }

    private void updateUser(Member savedMember, OAuth2UserInfo userInfo) {
        if (userInfo.getName() != null && !savedMember.getNickname().equals(userInfo.getName())) {
            savedMember.changeNickName(userInfo.getName());
        }

        if (userInfo.getImageUrl() != null && !savedMember.getProfileImageUrl().equals(userInfo.getImageUrl())) {
            savedMember.changeProfileImageUrl(userInfo.getImageUrl());
        }

        //return savedMember;
    }
}
