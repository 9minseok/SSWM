package com.ground.sswm.studyroom.service;


import com.ground.sswm.studyroom.dto.SearchStudyroomReqDto;
import com.ground.sswm.studyroom.dto.SearchStudyroomResDto;
import com.ground.sswm.studyroom.dto.StudyroomDto;
import java.util.List;

public interface StudyroomService {

    List<SearchStudyroomResDto> list(SearchStudyroomReqDto searchStudyroomReqDto);

    Long add(Long userId, StudyroomDto studyroomDto);

    void update(Long studyroomId, StudyroomDto studyroomDto);

    StudyroomDto select(Long studyroomId);

    void delete(Long studyroomId);

    boolean exists(String name);


}
