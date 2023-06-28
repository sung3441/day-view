package com.side.dayv.record.repository;

import com.side.dayv.record.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import java.util.Optional;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {

    Optional<Record> findByIdAndChannelId(final Long recordId, final Long channelId);

    List<Record> findByChannelId(final Long channelId);
  
}
