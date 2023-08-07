package com.ground.sswm.common.schedule;

import java.time.LocalTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ScheduledTasks {

    private final RedisToMySQLService redisToMySQLService;
    private final MySQLSelfService mySQLSelfService;

    @Scheduled(cron = "0 0/30 * * * ?") // Runs every 30 minutes
    public void updateRedisDataToMySQL() {
        LocalTime currentTime = LocalTime.now();
        int hour = currentTime.getHour();
        int minute = currentTime.getMinute();

        if (hour == 4 && minute >= 0 && minute < 2) {
            log.debug("작업: 4am에만 실행");
            redisToMySQLService.updateDataFromRedisToMySQL4();
            mySQLSelfService.dailyLogToUserStudyroom();
        } else {
            //4시 이전일때 before4 = true, 이후일때 false
            //어제 dailylog를 가져올 지 오늘 dailylog를 가져올 지 판단 때문에 필요
            int dayBefore = (hour < 4) ? 1 : 0;
            redisToMySQLService.updateDataFromRedisToMySQL(dayBefore);
        }
    }
}