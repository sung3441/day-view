package com.side.dayv.subscribe.repository;

import com.side.dayv.channel.entity.Channel;
import com.side.dayv.member.entity.Member;
import com.side.dayv.subscribe.dto.request.SubscribeRequestDto;
import com.side.dayv.subscribe.entity.Subscribe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubscribeRepository extends JpaRepository<Subscribe, Long> {

    Optional<Subscribe> findBySubscriberAndChannel(Member subscriber, Channel channel);
}
