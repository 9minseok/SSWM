import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Logo from "../assets/Logo.png";

const Gnb = (props) => {
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.replace("/Login");
  };

  return (
    <Header>
      <Link to="/StudyRoom" style={{ textDecoration: "none" }}>
        <LogoImg src={Logo} alt="Logo" />
      </Link>
      <GnbBtn>
        {isLoggedIn ? (
          <>
            <Link
              to="/MyPage"
              style={{ textDecoration: "none", color: "black" }}
            >
              <GnbBtn>마이페이지</GnbBtn>
            </Link>
            <GnbBtn onClick={handleLogout} style={{ cursor: "pointer" }}>
              로그아웃
            </GnbBtn>
          </>
        ) : (
          <Link to="/Login" style={{ textDecoration: "none", color: "black" }}>
            <GnbBtn>로그인</GnbBtn>
          </Link>
        )}
      </GnbBtn>
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;

const LogoImg = styled.img`
  width: 10%;
  height: 80%;
`

const GnbBtn = styled.div`
  display: inline-flex;
  font-size: 20px;
  margin-left: 15px;
  white-space: nowrap;
`;

export default Gnb;
