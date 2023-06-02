package com.side.dayv.channel.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.side.dayv.channel.dto.response.ChannelResponseDto;
import com.side.dayv.channel.dto.response.QChannelResponseDto;
import com.side.dayv.channel.entity.ChannelType;
import com.side.dayv.member.entity.QMember;
import com.side.dayv.subscribe.entity.QSubscribe;
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
    public List<ChannelResponseDto> findMyChannels(Long memberId, BooleanExpression where, BooleanExpression on) {
        return queryFactory
                .select(new QChannelResponseDto(
                        channel,
                        member,
                        JPAExpressions
                                .select(subscribe.count())
                                .from(subscribe)
                                .where(subscribe.channel.id.eq(channel.id))
                ))
                .from(channel)
                .innerJoin(subscribe)
                .on(on)
                .join(member)
                .on(member.id.eq(memberId))
                .where(where)
                .fetch();
    }
}
