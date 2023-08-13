import React, { useEffect, useState } from "react";
import styled from "styled-components";

import CustomModal from "./deleteModal";
import { Box, Typography, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";

const MemberTable = ({ studyroomId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [modalStates, setModalStates] = useState({});

  const openModal = (person) => {
    setModalStates(person.userDto);
    setIsModalOpen(true);
  }
  
  const closeModal = () => setIsModalOpen(false);

  const openHostModal = (person) => {
    setModalStates(person.userDto);
    setIsHostModalOpen(true);
  }

  const closeHostModal = () => setIsHostModalOpen(false);

  // Snackbar
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [isSnackBarOpenHost, setIsHostSnackBarOpen] = useState(false);

  const openSnackBar = () => setIsSnackBarOpen(true);
  const closeSnackBar = () => setIsSnackBarOpen(false);

  const openHostSnackBar = () => setIsHostSnackBarOpen(true);
  const closeHostSnackBar = () => setIsHostSnackBarOpen(false);

  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const [studyPeople, setStudyPeople] = useState();
  const [selectedUserId, setSelectedUserId] = useState();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("/api/studyrooms/" + studyroomId + "/search-user", {
          headers: {
            Authorization: accessToken,
          },
        });
        console.log("스터디원 목록:::", response.data);
        setStudyPeople(response.data);
      } catch (error) {
        console.error("유저 데이터를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchMembers(); // 함수 실행
  }, [studyroomId]);

  const navigate = useNavigate();

<<<<<<< frontend/sswm-front/src/components/StudyRoom/MemberTable.jsx
  const closeModalEvent = (userDto) => {
=======
  //유저차단
  const closeModalEvent = (event) => {
>>>>>>> frontend/sswm-front/src/components/StudyRoom/MemberTable.jsx
    setIsModalOpen(false);
    console.log("userDTO:::", userDto.id);

    const setBan = { targetId: selectedUserId }; // 선택한 유저의 ID 사용

    axios
<<<<<<< frontend/sswm-front/src/components/StudyRoom/MemberTable.jsx
      .put(`/api/studyrooms/${studyroomId}/ban`, userDto, {
=======
      .put(`/api/studyrooms/${studyroomId}/ban`, setBan, {
>>>>>>> frontend/sswm-front/src/components/StudyRoom/MemberTable.jsx
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("차단 ERROR::",response.data);
        openSnackBar(); // Open the CustomSnackBar after closing the modal
        window.location.reload();
        // Navigate(`/StudyRoomMember/${studyroomId}`);
      })
      .catch((error) => {
        // 오류 처리
        console.log(error);
        alert("해당유저를 스터디룸에서 차단하는것에 실패했습니다");
      });
  };

<<<<<<< frontend/sswm-front/src/components/StudyRoom/MemberTable.jsx
  const closeHostModalEvent = (userDto) => {
    setIsHostModalOpen(false);
    console.log("userDto",userDto);
    axios
      .put(`/api/studyrooms/${studyroomId}/pass`, userDto, {
=======
  //방장권한변경
  const closeHostModalEvent = (event) => {
    setIsHostModalOpen(false);

    const setHost = { targetId: selectedUserId }; // 선택한 유저의 ID 사용

    axios
      .put(`/api/studyrooms/${studyroomId}/pass`, setHost, {
>>>>>>> frontend/sswm-front/src/components/StudyRoom/MemberTable.jsx
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        console.log("권한 ERROR:::", response.data);
        openHostSnackBar(); // Open the CustomSnackBar after closing the modal
        navigate(`/StudyRoomMember/${studyroomId}`);
      })
      .catch((error) => {
        // 오류 처리
        console.log(Error);
        alert("방장변경에 실패했습니다");
      });
  };

  return (
    <ContainerWrap>
      {studyPeople &&
        studyPeople.map((person, idx) => (
          <TableWrap>
            <TbodyWrap>
              <TrWrap key={idx}>
                <TdWrap>{person.userDto.nickname}</TdWrap>
                <TdWrap>{person.role}</TdWrap>
                <TdWrap>
<<<<<<< frontend/sswm-front/src/components/StudyRoom/MemberTable.jsx
                  <ButtonWrap onClick={() => openHostModal(person)}>권한</ButtonWrap>
=======
                  <ButtonWrap onClick={() => openHostModal(person.userDto.id)}>권한</ButtonWrap>
>>>>>>> frontend/sswm-front/src/components/StudyRoom/MemberTable.jsx
                  <CustomModal isOpen={isHostModalOpen} closeModal={closeHostModal}>
                    <Box>
                      <Typography variant="h6" component="h2">
                        방장의 권한을 해당 유저에게 위임하겠습니까?
                      </Typography>
<<<<<<< frontend/sswm-front/src/components/StudyRoom/MemberTable.jsx
                      <Button onClick={() => closeHostModalEvent(modalStates)}>확인</Button>
=======
                      <Button onClick={(event) => closeHostModalEvent(event)}>확인</Button>
>>>>>>> frontend/sswm-front/src/components/StudyRoom/MemberTable.jsx
                      <Button onClick={() => setIsHostModalOpen(false)}>취소</Button>
                    </Box>
                  </CustomModal>
                  <Snackbar
                    open={isSnackBarOpenHost}
                    autoHideDuration={3000}
                    onClose={closeHostSnackBar}
                    message="방장이 변경되었습니다"
                  />
<<<<<<< frontend/sswm-front/src/components/StudyRoom/MemberTable.jsx
                  <ButtonWrap onClick={() => openModal(person)}>차단</ButtonWrap>
=======
                  <ButtonWrap onClick={() => openModal(person.userDto.id)}>차단</ButtonWrap>
>>>>>>> frontend/sswm-front/src/components/StudyRoom/MemberTable.jsx
                  <CustomModal isOpen={isModalOpen} closeModal={closeModal}>
                    <Box>
                      <Typography variant="h6" component="h2">
                        차단 시 해당 유저가 더 이상 해당 스터디룸을 이용하지 못합니다.
                        <br />
                        정말 차단하시겠습니까?
                      </Typography>
<<<<<<< frontend/sswm-front/src/components/StudyRoom/MemberTable.jsx
                      <Button onClick={() => closeModalEvent(modalStates)}>확인</Button>
=======
                      <Button onClick={(event) => closeModalEvent(event)}>확인</Button>
>>>>>>> frontend/sswm-front/src/components/StudyRoom/MemberTable.jsx
                      <Button onClick={() => setIsModalOpen(false)}>취소</Button>
                    </Box>
                  </CustomModal>
                  <Snackbar
                    open={isSnackBarOpen}
                    autoHideDuration={3000}
                    onClose={closeSnackBar}
                    message="정상적으로 차단되었습니다."
                  />
                </TdWrap>
              </TrWrap>
            </TbodyWrap>
          </TableWrap>
        ))}
    </ContainerWrap>
  );
};

const ContainerWrap = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  overflow-y: scroll;
`;
const TableWrap = styled.table`
  width: 100%;
  height: 100%;
  text-align: center;
  border: 1px solid #fff;
  border-spacing: 1px;
  font-family: "NanumSquareNeo";
  margin: auto;
`;
const TbodyWrap = styled.tbody``;
const TrWrap = styled.tr``;
const TdWrap = styled.td`
  padding: 10px;
  background-color: #eee;
`;
const ButtonWrap = styled.button`
  font-family: "NanumSquareNeo";
  margin-right: 10px;
`;

export default MemberTable;
