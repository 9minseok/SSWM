package com.ground.sswm.dailyLog.service;


import static com.ground.sswm.common.util.UnixTimeUtil.getStartEndOfPeriod;

import com.ground.sswm.common.util.UnixTimeUtil;
import com.ground.sswm.dailyLog.model.DailyLog;
import com.ground.sswm.dailyLog.repository.DailyLogRepository;
import com.ground.sswm.studyroom.exception.StudyroomNotFoundException;
import com.ground.sswm.studyroom.model.Studyroom;
import com.ground.sswm.studyroom.repository.StudyroomRepository;
import com.ground.sswm.user.exception.UserNotFoundException;
import com.ground.sswm.user.model.User;
import com.ground.sswm.userStudyroom.model.UserStudyroom;
import com.ground.sswm.user.repository.UserRepository;
import com.ground.sswm.userStudyroom.exception.UserStudyroomNotFoundException;
import com.ground.sswm.userStudyroom.repository.UserStudyroomRepository;
import java.time.LocalTime;
import java.time.ZoneId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DailyLogServiceImpl implements DailyLogService {

    private final DailyLogRepository dailyLogRepository;
    private final UserRepository userRepository;
    private final StudyroomRepository studyroomRepository;
    private final UserStudyroomRepository userStudyroomRepository;
    @Override
    public void create(Long studyroomId, Long userId) {
        Studyroom studyroom = studyroomRepository.findById(studyroomId).orElseThrow(
            () -> new StudyroomNotFoundException("해당 스터디룸이 없습니다.")
        );

        User user = userRepository.findById(userId).orElseThrow(
            () -> new UserNotFoundException("회원이 아닙니다.")
        );

        UserStudyroom userStudyroom = userStudyroomRepository.findByUserIdAndStudyroomId(userId, studyroomId).orElseThrow(
            () -> new UserStudyroomNotFoundException("해당 스터디룸에 가입되어 있지 않습니다.")
        );

        if (userStudyroom.isDeleted()){
            throw new UserStudyroomNotFoundException("해당 스터디룸에 가입되어 있지 않습니다.");
        }


        LocalTime currentTime = LocalTime.now();
        int hour = currentTime.getHour();
        long now = UnixTimeUtil.getCurrentUnixTime();
        int dayBefore = (hour < 4) ? 1 : 0;
        long[] days = getStartEndOfPeriod(now, ZoneId.of("Asia/Seoul"), dayBefore);

        if(dailyLogRepository.findByUserIdAndStudyroomIdAndDateBetween(userId, studyroomId, days[0], days[1]).isEmpty()){
            DailyLog newDailyLog = new DailyLog();

            newDailyLog.setDate(days[0]);
            newDailyLog.setStudyroom(studyroom);
            newDailyLog.setUser(user);
            dailyLogRepository.save(newDailyLog);
        };
    }
}
