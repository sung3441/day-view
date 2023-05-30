package com.side.dayv.channel.entity;

import com.side.dayv.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
public class Channel {

    @Id @GeneratedValue
    @Column(name = "channel_id")
    private Long id;

    @NotNull
    @Column(name = "name", length = 50)
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "channel_type")
    private ChannelType type;

    @NotNull
    @Column(name = "secret_yn")
    private boolean secretYn;

    @Column(name = "password", length = 1_000)
    private String password;

    @NotNull
    @Column(name = "create_date")
    private LocalDateTime createdDate;

    @NotNull
    @Column(name = "last_modified_date")
    private LocalDateTime lastModifiedDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member createMember;

    @Builder
    public Channel(String name, ChannelType channelType, boolean secretYn, String password,
                   LocalDateTime createdDate, LocalDateTime lastModifiedDate, Member member){
        this.name = name;
        this.type = channelType;
        this.secretYn = secretYn;
        this.password = password;
        this.createdDate = createdDate;
        this.lastModifiedDate = lastModifiedDate;
        this.createMember = member;
    }
}
