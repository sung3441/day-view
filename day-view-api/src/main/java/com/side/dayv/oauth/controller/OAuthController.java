package com.side.dayv.oauth.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class OAuthController {

    @GetMapping("/google")
    public void getGoogleAuthUrl(HttpServletResponse response) throws IOException {
        response.sendRedirect("https://accounts.google.com");
    }
}