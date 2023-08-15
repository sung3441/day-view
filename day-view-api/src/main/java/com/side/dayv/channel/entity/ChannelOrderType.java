package com.side.dayv.channel.entity;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.JPAExpressions;
import com.side.dayv.subscribe.entity.QSubscribe;

import static com.side.dayv.channel.entity.QChannel.*;

public enum ChannelOrderType {
    RECENT() {
        @Override
        public OrderSpecifier order(QSubscribe countSubscribe) {
            return new OrderSpecifier(Order.DESC, channel.createdDate);
        }
    },
    OLD() {
        @Override
        public OrderSpecifier order(QSubscribe countSubscribe) {
            return new OrderSpecifier(Order.ASC, channel.createdDate);
        }
    },
    SUBSCRIBER() {
        @Override
        public OrderSpecifier order(QSubscribe countSubscribe) {
            return new OrderSpecifier(
                    Order.DESC,
                    JPAExpressions
                            .select(countSubscribe.count())
                            .from(countSubscribe)
                            .where(countSubscribe.channel.id.eq(channel.id))
            );
        }
    };
    public abstract OrderSpecifier order(QSubscribe countSubscribe);
}
