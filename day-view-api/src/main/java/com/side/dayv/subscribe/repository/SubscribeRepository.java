package com.side.dayv.subscribe.repository;

import com.side.dayv.subscribe.entity.Subscribe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubscribeRepository extends JpaRepository<Subscribe, Long> {

    boolean existsByMemberIdAndChannelId(final Long memberId, final Long channelId);

    Optional<Subscribe> findByMemberIdAndChannelId(final Long memberId, final Long channelId);

}
