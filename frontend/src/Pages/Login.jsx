import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Components/Button';
import Input from '../Components/Input';

const WrapTitle = styled.div`
  width: fit-content;
  margin: 1rem auto 2rem auto;
  font-size: 1.5rem;
  font-weight: bold;
  align-items: center;
  /* border: 1px solid black; */
`;
const WrapInput = styled.div`
  box-sizing: content-box;
  width: fit-content;
  height: fit-content;
  margin: 10% auto;
  padding: 2rem 4rem;
  border: 1px solid grey;
  border-radius: 2rem;
  background-color: white;
`;

const WrapSignin = styled.div`
  margin-top: 0.5rem;
  text-align: center;
  /* border: 1px solid black; */
  color: grey;

  font-size: 0.8rem;
  cursor: pointer;
  &:hovers {
    border-bottom: 1px solid grey;
  }
`;

function Login() {
  // 회원가입 페이지 이동
  const navigate = useNavigate();
  const TransSignin = () => {
    navigate(`/Signin`);
  };

  // 메인 페이지 이동
  const TransMain = () => {
    navigate('/Main');
  };
  return (
    <div>
      <WrapInput>
        <WrapTitle>로그인</WrapTitle>
        <Input width='15rem' height='2.8rem' placeholder='아이디' />
        <Input
          width='15rem'
          height='2.8rem'
          marignTop='1rem'
          placeholder='비밀번호'
        />

        <Button
          width='15rem'
          height='2.5rem'
          margin='2rem 0rem 0rem 0rem'
          name='로그인'
          onClick={TransMain}
        />
        <WrapSignin onClick={TransSignin}>회원가입이 필요한가요?</WrapSignin>
      </WrapInput>
    </div>
  );
}

export default Login;
