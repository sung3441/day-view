package com.side.dayv.channel.entity;

import com.side.dayv.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Entity
public class Channel {

    @Id @GeneratedValue
    @Column(name = "channel_id")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "channel_type")
    private ChannelType type;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "secret_yn")
    private SecretYn secretYn;

    @Column(name = "password")
    private String password;

    @NotNull
    @Column(name = "create_date")
    private LocalDateTime createdDate;

    @NotNull
    @Column(name = "last_modified_date")
    private LocalDateTime lastModifiedDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @Column(name = "member_id")
    private Member createMember;
}
