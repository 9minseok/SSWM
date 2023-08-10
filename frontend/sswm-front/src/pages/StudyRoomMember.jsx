import React, { useState, useEffect } from "react";
import axios from "axios";

import styled from "styled-components";
import Gnb from "../components/Gnb";
import { Link } from "react-router-dom";

import StudyRoomMembers from "../components/StudyRoom/StudyRoomMembers";
import StudyRoomMemberScore from "../components/StudyRoom/StudyRoomMemberScore";
import StudyRoomMemberChat from "../components/StudyRoom/StudyRoomMemberChat";
import StudyRoomMemberTime from "../components/StudyRoom/StudyRoomMemberTime";
import StudyRoomMemberBoard from "../components/StudyRoom/StudyRoomMemberBoard";

import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import CustomModal from "../components/StudyRoom/deleteModal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Snackbar } from "@mui/material";
import { useParams } from "react-router-dom";
import GFooter from "../components/GFooter";

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = remainingMinutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
}

const StudyRoomMember = () => {
  const { studyroomId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studyroom, setStudyroom] = useState([]);
  const [studyAvgTime, setStudyAvgTime] = useState("");
  const [maxRestTime, setMaxRestTime] = useState("");

  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Snackbar
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  const openSnackBar = () => setIsSnackBarOpen(true);
  const closeSnackBar = () => setIsSnackBarOpen(false);

  const closeModalEvent = () => {
    setIsModalOpen(false);
    openSnackBar(); // Open the CustomSnackBar after closing the modal
  };

  const handleenterAdmin = () => {
    window.location.href = `/StudyroomAdmin/${studyroomId}`;
  };

  useEffect(() => {
    // 스터디룸 관련 정보 조회
    axios
      .get(`/api/studyrooms/${studyroomId}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setStudyroom(response.data); // API 호출 완료 후에 studyrooms 업데이트
        console.log("studyroom", response.data);
        setStudyAvgTime(formatTime(response.data.studyAvgTime));
        setMaxRestTime(formatTime(response.data.maxRestTime));
      })
      .catch((error) => {
        console.log(error);
      });

    // 스터디룸 가입
    axios
      .post(
        `/api/studyrooms/${studyroomId}/join`,
        {},
        {
          headers: {
            Authorization: accessToken,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // 접속중인 유저들 정보 -> 컴포넌트 안에서 호출
  }, [studyroomId, accessToken]);

  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <HeaderWrap>
          <HeaderTitle>
            {studyroom.name}
            <HeaderBtnWrap>
              <Link to="/StudyRoomAdmin" style={{ textDecoration: "none" }}>
                <IconButton onClick={handleenterAdmin} aria-label="setting" size="large">
                  <SettingsIcon fontSize="inherit" />
                </IconButton>
              </Link>
            </HeaderBtnWrap>
          </HeaderTitle>
        </HeaderWrap>
        <ContentWrap>
            {/* 스터디원 */}
            <StudyMemberWrap>
              <StudyRoomMembers studyroomId={studyroomId} />
            </StudyMemberWrap>
            
            <div style={{display:"flex",justifyContent:"space-between"}}>
              {/* 공지사항 */}
              <StudyRoomBoardWrap>
                <StudyRoomMemberBoard notice={studyroom.notice} />
              </StudyRoomBoardWrap>

              {/* 공부,휴식 시간 */}
              <div style={{display:"flex",flexDirection:"column",alignItems: "center"}}>
                <Link to="/LiveRoom" style={{ textDecoration: "none" }}>
                  <Button variant="contained" color="primary">
                    라이브 입장
                  </Button>
                </Link>
                <StudyRoomTimeWrap>
                  <StudyRoomMemberTime studyAvgTime={studyAvgTime} maxAvgTime={maxRestTime} />
                </StudyRoomTimeWrap>
              </div>
            </div>
       
        </ContentWrap>
        <ContentWrap>
          <StudyScoreWrap>
              {/*일일 공부왕, 7월 출석왕*/}
              <StudyRoomMemberScore studyroomId={studyroomId} />
          </StudyScoreWrap>
        </ContentWrap>
        <ContentWrap>
               {/* 스터디룸 탈퇴하기 */}
               <Button variant="contained" color="success" onClick={openModal}>
                스터디룸 탈퇴하기
              </Button>
              <CustomModal isOpen={isModalOpen} closeModal={closeModal}>
                <Box>
                  <Typography variant="h6" component="h2">
                    삭제 시 더 이상 해당 스터디룸을 이용하지 못합니다.
                    <br />
                    정말 삭제하시겠습니까?
                  </Typography>
                  <Button onClick={() => closeModalEvent()}>확인</Button>
                  <Button onClick={() => setIsModalOpen(false)}>취소</Button>
                </Box>
              </CustomModal>
              <Snackbar
                open={isSnackBarOpen}
                autoHideDuration={3000}
                onClose={closeSnackBar}
                message="정상적으로 탈퇴되었습니다."
              />
        </ContentWrap>
      </ContainerWrap>
      <GFooter />
    </div>
  );
};

const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const HeaderWrap = styled.div`
  display: flex;
  height: 10%;
`;
const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-radius: 15px;
  font-size: 30px;
  font-family: "NanumSquareNeo";
`;
const HeaderBtnWrap = styled.span`
  display: flex;
`;
const HeaderBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 100%;
  gap: 1vw;
`;
const ContentWrap = styled.div`
  display: flex;
  width: 80%;
  height: 90%;
  margin-top: 2vw;
  flex-direction: column;
`;
const ContentLeftWrap = styled.div`
  width: 80%;
  height: 100%;
`;
const StudyMemberWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20%;
  gap: 1vw;
`;
const StudyScoreWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40%;
`;

const ContentRightWrap = styled.div`
  width: 20%;
  height: 100%;
`;
const StudyRoomTimeWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  
`;
const StudyRoomBoardWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
export default StudyRoomMember;
