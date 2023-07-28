import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

import Gnb from "../components/Gnb";

import GoogleLogo from '../assets/Google_Logo.svg';
import KakaoLogo from '../assets/Kakao_Logo.svg';

import Box from '@mui/material/Box'
import Button from '@mui/material/Button';

const Login = () => {
  return (
    <div>
      <Gnb />
      <ContainerWrap>
        <Box component="span" sx={{ p: 2, border: '1px solid grey' }}>
          <LoginWrap>
            <Text> 간편로그인 </Text>
            <SocialWrap>
              <LogoImg src={GoogleLogo} />
              <LogoImg src={KakaoLogo} />
            </SocialWrap>
            <ButtonWrap>
              <Link to="/SignUp"><Button variant="outlined">회원가입</Button></Link>
              <Link to="/SignUpName"><Button variant="outlined">로그인</Button></Link>
            </ButtonWrap>
          </LoginWrap>
        </Box>
      </ContainerWrap>
    </div>
  );
};

const ContainerWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`
const LoginWrap = styled.div`
  position: relative;
  width: 480px;
  height: 300px;
  background-color: #FFFFFF;
`
const SocialWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`

const LogoImg = styled.img`
  width: 240px;
  height: 100px;
`

const Text = styled.p`
  font-family: "NanumSquareNeo";
  font-size : 32px;
  text-align : center;
`
const ButtonWrap = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`

export default Login;