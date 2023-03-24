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
  margin-top: -4rem;
  /* margin-right: 2rem; */
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
            width='8rem'
            height='5rem'
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
            height='5rem'
            name='마이 페이지'
            color='rgba(69, 149, 255)'
            // margin='0rem 1rem 0rem 0rem'
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
            height='5rem'
            // margin='0rem 0rem 1rem 0rem'
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
