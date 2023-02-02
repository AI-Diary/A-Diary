import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Components/Button';
import Input from '../Components/Input';

const WrapTitle = styled.div`
  width: fit-content;
  margin: 2rem auto;
  font-size: 1.5rem;
  font-weight: bold;
  align-items: center;
  /* border: 1px solid black; */
`;
const WrapInputs = styled.div`
  box-sizing: content-box;
  width: fit-content;
  height: fit-content;
  margin: 5% auto;
  padding: 2rem 4rem;
  border: 1px solid grey;
  border-radius: 2rem;
  background-color: white;
`;

const ExplainInput = styled.div`
  /* width: 4rem; */
  height: fit-content;
  margin: 2rem 0rem 0.5rem 0rem;
  /* border: 1px solid blue; */
`;

function Signin() {
  const nagivate = useNavigate();
  const TransMain = () => {
    nagivate(`/Main`);
  };
  return (
    <div>
      <WrapInputs>
        <WrapTitle>회원가입</WrapTitle>

        <ExplainInput>이름</ExplainInput>
        <Input width='15rem' height='2.8rem' />

        <ExplainInput>아이디</ExplainInput>
        <Input width='15rem' height='2.8rem' />

        <ExplainInput>비밀번호</ExplainInput>
        <Input width='15rem' height='2.8rem' marignTop='1rem' />

        <ExplainInput>비밀번호 확인</ExplainInput>
        <Input width='15rem' height='2.8rem' marignTop='1rem' />

        <ExplainInput>이메일</ExplainInput>
        <Input width='15rem' height='2.8rem' marignTop='1rem' />

        <Button
          width='15rem'
          height='2.5rem'
          margin='3rem 0rem 1.5rem 0rem'
          name='가입하기'
          onClick={TransMain}
        />
      </WrapInputs>
    </div>
  );
}

export default Signin;
