package com.ground.sswm.studyroom;

import com.ground.sswm.auth.service.AuthService;
import com.ground.sswm.image.util.FileManageUtil;
import com.ground.sswm.studyroom.dto.SearchStudyroomReqDto;
import com.ground.sswm.studyroom.dto.SearchStudyroomResDto;
import com.ground.sswm.studyroom.dto.StudyroomDto;
import com.ground.sswm.studyroom.service.StudyroomService;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/studyrooms")
public class StudyroomController {

    private final StudyroomService studyroomService;
    private final AuthService authService;

    private final FileManageUtil fileManageUtil;

    // 전체 조회 (아직 구현하지 않았습니다!!!!!!)
    @GetMapping
    @ResponseBody
    public ResponseEntity<List<SearchStudyroomResDto>> list(
        @RequestBody SearchStudyroomReqDto searchStudyroomReqDto) {
        List<SearchStudyroomResDto> studyrooms = studyroomService.list(searchStudyroomReqDto);
        return new ResponseEntity<List<SearchStudyroomResDto>>(studyrooms, HttpStatus.OK);
    }


    // 스터디룸 생성
    @PostMapping
    @ResponseBody
    public ResponseEntity<Long> add(@RequestHeader("Authorization") String token,
        @RequestPart(value = "studyroomDto", required = false) StudyroomDto studyroomDto,
        @RequestPart(value = "file", required = false) MultipartFile multipartFile,
        @RequestPart(value = "fileType", required = false) String fileType) {

        System.out.println("여기까진오나?");
        log.debug("[POST] /user : file " + multipartFile);
        log.debug("[POST] /user : fileType " + fileType);
        log.debug("[POST] /user : token " + token);
        log.debug("[POST] /user : studyroomDto " + studyroomDto);

        // 실제로는 이렇게 해야함!
        Map<String, Object> claims = authService.getClaimsFromToken(token);
        Long userId = Long.valueOf(claims.get("id").toString());

        log.debug("userId :" + userId);

        // 이미지 저장
        String filePath = null;
        if (fileType != null && !fileType.isBlank() && multipartFile != null
            && !multipartFile.isEmpty()) {
            filePath = fileManageUtil.uploadFile(fileType, multipartFile);
        }

        log.debug("[filePath]>>>> " + filePath);

        studyroomDto.setImage(filePath);

        Long studyroomId = studyroomService.add(userId, studyroomDto);

        return new ResponseEntity<Long>(studyroomId, HttpStatus.OK);
    }

    // 스터디룸 수정
    @PutMapping("/{studyroomId}")
    @ResponseBody
    public ResponseEntity<Void> update(@PathVariable("studyroomId") Long studyroomId,
        @RequestBody StudyroomDto studyroomDto) {
        studyroomService.update(studyroomId, studyroomDto);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @DeleteMapping("/{studyroomId}")
    @ResponseBody
    public ResponseEntity<Void> delete(@PathVariable("studyroomId") Long studyroomId) {
        studyroomService.delete(studyroomId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    // id로 스터디룸 조회
    @GetMapping("/{studyroomId}")
    @ResponseBody
    public ResponseEntity<StudyroomDto> select(@PathVariable("studyroomId") Long studyroomId) {
        StudyroomDto studyroom = studyroomService.select(studyroomId);
        return new ResponseEntity<StudyroomDto>(studyroom, HttpStatus.OK);
    }

    // 룸 제목 중복 확인
    @GetMapping("/exists")
    @ResponseBody
    public ResponseEntity<Boolean> exists(@RequestBody StudyroomDto studyroomDto) {
        boolean isExist = studyroomService.exists(studyroomDto.getName());
        return new ResponseEntity<Boolean>(isExist, HttpStatus.OK);

    }
}
