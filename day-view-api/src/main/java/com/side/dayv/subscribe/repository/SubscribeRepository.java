package com.side.dayv.subscribe.repository;

import com.side.dayv.member.entity.Member;
import com.side.dayv.subscribe.entity.Subscribe;
import com.side.dayv.subscribe.entity.SubscribeAuth;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubscribeRepository extends JpaRepository<Subscribe, Long> {

    boolean existsByMemberIdAndChannelId(final Long memberId, final Long channelId);

    Optional<Subscribe> findByMemberIdAndChannelId(final Long memberId, final Long channelId);

    @EntityGraph(attributePaths = {"member"})
    List<Subscribe> findAllByChannelId(final Long channelId);

}
