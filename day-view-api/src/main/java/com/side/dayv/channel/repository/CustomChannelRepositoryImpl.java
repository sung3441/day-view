package com.side.dayv.channel.repository;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.side.dayv.channel.dto.request.SearchChannelDto;
import com.side.dayv.channel.dto.response.ChannelResponseDto;
import com.side.dayv.channel.dto.response.ManageChannelResponseDto;
import com.side.dayv.channel.dto.response.QChannelResponseDto;
import com.side.dayv.channel.dto.response.QManageChannelResponseDto;
import com.side.dayv.channel.entity.ChannelOrderType;
import com.side.dayv.channel.entity.ChannelType;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.side.dayv.channel.entity.QChannel.*;
import static com.side.dayv.member.entity.QMember.*;
import static com.side.dayv.subscribe.entity.QSubscribe.*;

@Transactional
public class CustomChannelRepositoryImpl implements CustomChannelRepository {

    private final JPAQueryFactory queryFactory;

    public CustomChannelRepositoryImpl(final EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<ManageChannelResponseDto> findMyChannels(final Long memberId, final BooleanExpression where, final BooleanExpression on) {
        return queryFactory
                .select(new QManageChannelResponseDto(
                        channel,
                        subscribe
                ))
                .from(channel)
                .innerJoin(subscribe)
                .on(on.and(subscribe.member.id.eq(memberId)))
                .join(member)
                .on(member.id.eq(memberId))
                .where(where)
                .fetch();
    }

    @Override
    public Page<ChannelResponseDto> findChannels(final Long memberId, final Pageable pageable, final SearchChannelDto search) {
        List<ChannelResponseDto> channels = queryFactory
                .select(new QChannelResponseDto(
                        channel,
                        member,
                        subscribe.isNotNull(),
                        JPAExpressions
                                .select(subscribe.count())
                                .from(subscribe)
                                .where(subscribe.channel.id.eq(channel.id))
                ))
                .from(channel)
                .leftJoin(member)
                .on(member.id.eq(channel.createMember.id))
                .leftJoin(subscribe)
                .on(subscribe.channel.id.eq(channel.id))
                .where(channel.type.eq(ChannelType.CUSTOM).and(channelSearch(search.getKeyword())))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(channelOrder(search.getOrder()))
                .fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(channel.count())
                .from(channel)
                .where(channel.type.eq(ChannelType.CUSTOM).and(channelSearch(search.getKeyword())));

        return PageableExecutionUtils.getPage(channels, pageable, countQuery::fetchOne);
    }

    private BooleanExpression channelSearch(String keyword) {
        if (keyword == null) {
            return null;
        }
        return channel.name.contains(keyword).or(channel.createMember.nickname.contains(keyword));
    }

    private OrderSpecifier channelOrder(ChannelOrderType order) {
        if (order == null) {
            return ChannelOrderType.RECENT.order();
        }
        return order.order();
    }
}
