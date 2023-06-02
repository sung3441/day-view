package com.side.dayv.channel.entity;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.side.dayv.subscribe.entity.SubscribeAuth;

import static com.side.dayv.channel.entity.QChannel.channel;
import static com.side.dayv.subscribe.entity.QSubscribe.subscribe;

public enum ChannelSelectType {

    MANAGE("manage", "manageChannels") {
        @Override
        public BooleanExpression whereQuery() {
            return channel.type.eq(ChannelType.MY) // 내 채널
                    .or(channel.type.eq(ChannelType.CUSTOM)) // 일반 채널
                    .or(channel.type.eq(ChannelType.SECRET)); // 비밀 채널
        }

        @Override
        public BooleanExpression subscribeJoinOnQuery() {
            return subscribe.channel.eq(channel).and(subscribe.auth.eq(SubscribeAuth.MANAGE)); // 관리 권한
        }
    }, // 관리 채널
    SUBSCRIBE("subscribe", "subscribeChannels") {
        @Override
        public BooleanExpression whereQuery() {
            return channel.type.eq(ChannelType.CUSTOM) // 일반 채널
                    .or(channel.type.eq(ChannelType.SECRET)); // 비밀 채널
        }

        @Override
        public BooleanExpression subscribeJoinOnQuery() {
            return subscribe.channel.eq(channel).and(subscribe.auth.eq(SubscribeAuth.SUBSCRIBE)); // 구독 권한
        }
    }, // 구독 채널
    GOOGLE("google", "googleChannels") {
        @Override
        public BooleanExpression whereQuery() {
            return channel.type.eq(ChannelType.GOOGLE);
        }

        @Override
        public BooleanExpression subscribeJoinOnQuery() {
            return subscribe.channel.eq(channel).and(subscribe.auth.eq(SubscribeAuth.MANAGE));
        }
    }; // 구글 채널;

    private final String value;

    private final String key;

    ChannelSelectType(String value, String key) {
        this.value = value;
        this.key = key;
    }

    public abstract BooleanExpression whereQuery();
    public abstract BooleanExpression subscribeJoinOnQuery();

    public String getKey() {
        return key;
    }
}
