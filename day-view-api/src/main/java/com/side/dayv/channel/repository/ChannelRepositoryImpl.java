package com.side.dayv.channel.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.side.dayv.channel.dto.response.ChannelResponseDto;
import com.side.dayv.channel.dto.response.QChannelResponseDto;
import com.side.dayv.channel.entity.ChannelType;
import com.side.dayv.member.entity.QMember;
import com.side.dayv.subscribe.entity.SubscribeAuth;
import jakarta.persistence.EntityManager;

import java.util.List;

import static com.side.dayv.channel.entity.QChannel.*;
import static com.side.dayv.member.entity.QMember.*;
import static com.side.dayv.subscribe.entity.QSubscribe.*;

public class ChannelRepositoryImpl implements ChannelRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public ChannelRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<ChannelResponseDto> findManageChannels(Long memberId) {
        return queryFactory
                .select(new QChannelResponseDto(channel, member))
                .innerJoin(subscribe.channel, channel)
                .leftJoin(channel.createMember, member)
                .where(
                        channel.type.eq(ChannelType.MY) // 내 채널
                                .or(channel.type.eq(ChannelType.CUSTOM).and(subscribe.auth.eq(SubscribeAuth.MANAGE))) // 편집자 권한
                )
                .fetch();
    }

    @Override
    public List<ChannelResponseDto> findSubscribeChannels(Long memberId) {
        return queryFactory
                .select(new QChannelResponseDto(channel, member))
                .innerJoin(subscribe.channel, channel)
                .leftJoin(channel.createMember, member)
                .where(channel.type.eq(ChannelType.CUSTOM).and(subscribe.auth.eq(SubscribeAuth.SUBSCRIBE))) // 구독 권한
                .fetch();
    }

    @Override
    public List<ChannelResponseDto> findGoogleChannels(Long memberId) {
        return queryFactory
                .select(new QChannelResponseDto(channel, member))
                .innerJoin(subscribe.channel, channel)
                .leftJoin(channel.createMember, member)
                .where(channel.type.eq(ChannelType.GOOGLE))
                .fetch();
    }
}
