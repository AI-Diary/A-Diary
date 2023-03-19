import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';

const WrapMenu = styled.div`
  width: 100vw;
  height: 5rem;
  min-width: 60rem;
  background-color: rgba(256, 256, 256, 0.8);
  border: 0.1px solid transparent;
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
  margin-top: 1rem;
  margin-left: 1rem;
  cursor: pointer;
`;
const WrapButtons = styled.div`
  width: fit-content;
  height: fit-content;
  float: right;
  /* border: 2px solid black; */
  margin-top: -2.5rem;
  margin-right: 2rem;
  /* position: absolute; */
`;

function Menu() {
  const navigate = useNavigate();

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
    navigate('/');
  };

  // 메인 페이지 이동
  const NavigateToMain = () => {
    navigate('/Main');
  };
  return (
    <div>
      <WrapMenu>
        <Logo onClick={NavigateToMain}>A - Diary</Logo>
        <WrapButtons>
          <Button
            width='5rem'
            height='2.3rem'
            name='오늘의 일기'
            color='grey'
            margin='0rem 1rem 0rem 0rem'
            border='2px solid grey'
            backgroundColor='transparent;'
            hoverBackgroundColor='rgba(256,256,256,0.6)'
            onClick={NavigateToWrite}
          />
          <Button
            width='5rem'
            height='2.3rem'
            name='마이 페이지'
            color='grey'
            margin='0rem 1rem 0rem 0rem'
            border='2px solid grey'
            backgroundColor='transparent'
            hoverBackgroundColor='rgba(256,256,256,0.6)'
            onClick={NavigateToStatistics}
          />
          <Button
            width='5rem'
            height='2.3rem'
            margin='0rem 0rem 1rem 0rem'
            name='로그아웃'
            color='grey'
            border='2px solid grey'
            backgroundColor='transparent'
            hoverBackgroundColor='rgba(256,256,256,0.6)'
            onClick={NavigateToDefault}
          />
        </WrapButtons>
      </WrapMenu>
    </div>
  );
}

export default Menu;
