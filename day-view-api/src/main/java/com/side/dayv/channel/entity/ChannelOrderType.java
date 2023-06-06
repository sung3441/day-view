package com.side.dayv.channel.entity;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.JPAExpressions;

import static com.side.dayv.channel.entity.QChannel.*;
import static com.side.dayv.subscribe.entity.QSubscribe.*;

public enum ChannelOrderType {
    RECENT() {
        @Override
        public OrderSpecifier order() {
            return new OrderSpecifier(Order.DESC, channel.createdDate);
        }
    },
    OLD() {
        @Override
        public OrderSpecifier order() {
            return new OrderSpecifier(Order.ASC, channel.createdDate);
        }
    },
    SUBSCRIBER() {
        @Override
        public OrderSpecifier order() {
            return new OrderSpecifier(
                    Order.DESC,
                    JPAExpressions
                            .select(subscribe.count())
                            .from(subscribe)
                            .where(subscribe.channel.id.eq(channel.id))
            );
        }
    };
    public abstract OrderSpecifier order();
}
