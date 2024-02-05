import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';

const WrapMenu = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100vw;
  height: 5rem;
  /* min-width: 60rem; */
  align-items: center;
  min-width: ${(props) => props.minWidth};
  background-color: rgba(256, 256, 256, 0.8);
  /* border: 0.1px solid #ffffff06; */
`;

const Logo = styled.div`
  /* margin-top: 10rem; */
  width: fit-content;
  height: fit-content;
  /* border: 2px solid black; */
  color: rgba(51, 153, 255);
  font-size: 2rem;
  font-family: 'LogoFont';
  text-align: center;
  /* margin-top: 1rem;
  margin-left: 1rem; */
  padding-left: 1rem;
  cursor: pointer;
`;
const WrapButtons = styled.div`
  width: fit-content;
  height: fit-content;
  margin-left: auto;
  /* float: right; */
  /* border: 2px solid black; */
  /* margin-top: -4rem; */
  /* margin-right: 2rem; */
  /* position: absolute; */
`;

function Menu({ minWidth }) {
  const navigate = useNavigate();

  // console.log(props.userId);
  useEffect(() => {
    if (localStorage.userid === '0') {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/Login');
    }
  }, []);

  // 마이페이지 페이지 이동
  const NavigateToStatistics = () => {
    navigate(`/MyPage`);
  };
  // 글쓰기 페이지 이동
  const NavigateToWrite = () => {
    navigate(`/Write`, { state: null });
  };
  // 웰컴 페이지 이동
  const NavigateToDefault = () => {
    localStorage.userid = 0;
    navigate('/');
  };

  // 메인 페이지 이동
  const NavigateToMain = () => {
    navigate('/Main');
  };
  return (
    <div>
      <WrapMenu minWidth={minWidth}>
        <Logo onClick={NavigateToMain}>A - Diary</Logo>
        <WrapButtons>
          <Button
            width='8rem'
            height='4.69rem'
            name='오늘의 일기'
            color='rgba(69, 149, 255)'
            // margin='0rem 1rem 0rem 0rem'
            border='2px solid transparent'
            backgroundColor='transparent;'
            hoverBackgroundColor='rgba(69, 149, 255)'
            hoverColor='white'
            hoverBorder='2px solid rgba(69, 149, 255)'
            fontSize='1rem'
            onClick={NavigateToWrite}
          />
          <Button
            width='8rem'
            height='4.69rem'
            name='마이 페이지'
            color='rgba(69, 149, 255)'
            border='2px solid transparent'
            backgroundColor='transparent'
            hoverBackgroundColor='rgba(69, 149, 255)'
            hoverColor='white'
            hoverBorder='2px solid rgba(69, 149, 255)'
            fontSize='1rem'
            onClick={NavigateToStatistics}
          />
          <Button
            width='8rem'
            height='4.69rem'
            name='로그아웃'
            color='grey'
            border='2px solid transparent'
            backgroundColor='transparent'
            hoverBackgroundColor='grey'
            hoverBorder='2px solid grey'
            hoverColor='white'
            fontSize='1rem'
            onClick={NavigateToDefault}
          />
        </WrapButtons>
      </WrapMenu>
    </div>
  );
}

export default Menu;
