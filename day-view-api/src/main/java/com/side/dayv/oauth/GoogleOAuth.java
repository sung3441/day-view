package com.side.dayv.oauth;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GoogleOAuth {

    private final String googleLoginUrl = "https://accounts.google.com";
    private final String GOOGLE_TOKEN_REQUEST_URL = "https://oauth2.googleapis.com/token";
    private final String GOOGLE_USERINFO_REQUEST_URL = "https://www.ggogleapis.com/oauth2/v1/userinfo";
}
