package com.side.dayv.record.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.side.dayv.channel.dto.response.QChannelResponseDto;
import com.side.dayv.channel.entity.QChannel;
import com.side.dayv.record.dto.QResponseScheduleRecordDTO;
import com.side.dayv.record.dto.RequestSearchRecordDTO;
import com.side.dayv.record.dto.ResponseScheduleRecordDTO;
import com.side.dayv.record.entity.Record;
import com.side.dayv.record.entity.QRecord;
import com.side.dayv.subscribe.entity.QSubscribe;
import jakarta.persistence.EntityManager;

import java.util.List;


public class CustomRecordRepositoryImpl implements CustomRecordRepository {

    private final JPAQueryFactory queryFactory;

    public CustomRecordRepositoryImpl(final EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<ResponseScheduleRecordDTO> getRecordOfSubscribedChannels(Long userId, RequestSearchRecordDTO searchRecordDTO){

        QRecord recordEntity = QRecord.record;
        return queryFactory.select(new QResponseScheduleRecordDTO(QRecord.record, QChannel.channel, QSubscribe.subscribe))
                .from(QSubscribe.subscribe)
                .innerJoin(QChannel.channel)
                .on(QSubscribe.subscribe.channel.id.eq(QChannel.channel.id))
                .innerJoin(QRecord.record)
                .on(QChannel.channel.id.eq(QRecord.record.channel.id))
                .where(QSubscribe.subscribe.member.id.eq(userId)
                        .and(recordEntity.startDate.after(searchRecordDTO.getStartDate()).and(recordEntity.startDate.before(searchRecordDTO.getEndDate()))
                                .or(recordEntity.endDate.after(searchRecordDTO.getStartDate()).and(recordEntity.endDate.before(searchRecordDTO.getEndDate())))
                                .or(recordEntity.startDate.before(searchRecordDTO.getStartDate()).and(recordEntity.endDate.after(searchRecordDTO.getEndDate())))
                        )
                )
                .fetch();
    }
}
