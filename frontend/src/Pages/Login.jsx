import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../Components/Button';
import Input from '../Components/Input';

const Wrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(51, 153, 255),
    rgba(178, 102, 255)
  );
  font-family: 'NanumGothic';
`;

const WrapTitle = styled.div`
  /* border: 1px solid black; */
  width: fit-content;
  margin: 1rem auto 2rem auto;
  font-size: 1.5rem;
  font-weight: bold;
  align-items: center;
`;

const WrapForms = styled.div`
  /* border: 1px solid grey; */
  box-sizing: content-box;
  width: fit-content;
  height: fit-content;
  margin: 10% auto;
  padding: 2rem 4rem;
  border-radius: 2rem;
  background-color: rgba(256, 256, 256, 0.85);
  box-shadow: 0.4rem 0.4rem 1rem rgba(120, 120, 120, 0.3);
`;

const WrapSignin = styled.div`
  /* border: 1px solid black; */
  margin-top: 0.5rem;
  text-align: center;
  color: grey;
  font-size: 0.8rem;
  cursor: pointer;
  &:hovers {
    /* border-bottom: 1px solid darkgrey; */
    color: red;
  }
`;

function Login() {
  // 회원가입 페이지 이동
  const navigate = useNavigate();
  const NavigateToSignin = () => {
    navigate(`/Signin`);
  };

  // 메인 페이지 이동
  const NavigateToMain = () => {
    navigate('/Main');
  };
  return (
    <div>
      <Wrap>
        <WrapForms>
          <WrapTitle>로그인</WrapTitle>

          <Input
            width='15rem'
            height='2.8rem'
            placeholder='아이디'
            borderRadius='0.4rem 0.4rem 0rem 0rem'
            backgroundColor='rgba(256, 256, 256, 0.7)'
            borderStyle='solid solid none solid'
          />

          <Input
            width='15rem'
            height='2.8rem'
            placeholder='비밀번호'
            borderRadius='0rem 0rem 0.4rem 0.4rem'
            backgroundColor='rgba(256, 256, 256, 0.7)'
          />

          <Button
            width='15rem'
            height='2.5rem'
            margin='2rem 0rem 0rem 0rem'
            name='로그인'
            border='2px solid grey'
            background='white'
            color='grey'
            onClick={NavigateToMain}
          />
          <WrapSignin onClick={NavigateToSignin}>
            회원가입이 필요한가요?
          </WrapSignin>
        </WrapForms>
      </Wrap>
    </div>
  );
}

export default Login;
