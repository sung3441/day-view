package com.side.dayv.member.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RequestMemberDTO {
    private String nickname;
    private String profileImageUrl;
    private String birthday;
}
