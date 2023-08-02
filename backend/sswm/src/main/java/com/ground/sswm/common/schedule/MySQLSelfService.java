package com.ground.sswm.common.schedule;

import static com.ground.sswm.common.util.UnixTimeUtil.toSeoulTime;

import com.ground.sswm.common.util.UnixTimeUtil;
import com.ground.sswm.dailyLog.domain.DailyLog;
import com.ground.sswm.dailyLog.domain.DailyLogRepository;
import com.ground.sswm.userStudyroom.domain.UserStudyroom;
import com.ground.sswm.userStudyroom.domain.UserStudyroomRepository;
import java.time.Instant;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
@Slf4j
@Service
@RequiredArgsConstructor
public class MySQLSelfService {
    private final DailyLogRepository dailyLogRepository;
    private final UserStudyroomRepository userStudyroomRepository;

    public void performDailyAccumulate(){
        // [0] 작업을 진행할 초기 시간 ~ 끝 시간 선택
        Instant now = Instant.now();
        Instant startTime = UnixTimeUtil.getStartOfPeriod(now);
        Instant endTime = UnixTimeUtil.getEndOfPeriod(startTime);
        log.debug("[오늘 새벽 N시에 작업 진행] : 전날0N시 ~ 다음날 (N-1)시59분59초\t"
            + toSeoulTime(startTime)+" "+ toSeoulTime(endTime));

        // [1] DailyLog에서 (studyTime, restTime, stretchScore) 읽어오기
        List<DailyLog> dailyLogList = dailyLogRepository.findAllDateBetween(startTime.getEpochSecond(), endTime.getEpochSecond());


        // TODO : UserStudyroom (totalStudy, totalRest)에 누적업데이트하기
        // TODO : Test Code 작성해서 확인해보기
        dailyLogList.forEach(
            x-> {
                UserStudyroom userStudyroom = userStudyroomRepository
                    .findByUserIdAndStudyroomId(x.getUser().getId(),x.getStudyroom().getId())
                    .orElse(null);
                if(userStudyroom == null) return;
                userStudyroom.setTotalRest(userStudyroom.getTotalRest() + x.getRestTime());
                userStudyroom.setTotalStudy(userStudyroom.getTotalStudy() + x.getStudyTime());
                userStudyroomRepository.save(userStudyroom);
            }
        );

    }
}
