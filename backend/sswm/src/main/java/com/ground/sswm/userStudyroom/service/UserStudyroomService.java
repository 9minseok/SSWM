package com.ground.sswm.userStudyroom.service;


import com.ground.sswm.user.dto.UserDto;
import com.ground.sswm.userStudyroom.dto.OnAirResDto;
import com.ground.sswm.userStudyroom.dto.UserStudyTimeResDto;
import com.ground.sswm.userStudyroom.dto.UserStudyroomDto;
import java.util.List;

public interface UserStudyroomService {
    void join(UserDto userDto, Integer studyroomId, UserStudyroomDto userStudyroomDto);

    OnAirResDto searchUser(UserDto userDto, Integer studyroomId);

    void leave(UserDto userDto, Integer studyroomId);

    void ban(Integer userId, Integer targetId, Integer studyroomId);

    void pass(Integer userId, Integer targetId, Integer studyroomId);

    List<UserStudyTimeResDto> searchDailyStudy(Integer studyroomId);

    List<UserDto> searchDailyAttend(UserDto userDto, Integer studyroomId);
}
