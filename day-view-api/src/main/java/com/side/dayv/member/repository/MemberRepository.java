package com.side.dayv.member.repository;

import com.side.dayv.member.entity.Member;
import com.side.dayv.oauth.entity.ProviderType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByEmail(String email);

    Member findByEmailAndRefreshToken(String email, String refreshToken);

    Optional<Member> findByIdAndProvider(Long memberId, ProviderType providerType);
}
