package com.side.dayv.member.repository;

import com.side.dayv.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByEmail(String email);

    Member findByEmailAndRefreshToken(String email, String refreshToken);
}
