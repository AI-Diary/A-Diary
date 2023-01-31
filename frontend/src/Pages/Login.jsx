import React from 'react';
import styled from 'styled-components';
import Button from '../Components/Button';
import Input from '../Components/Input';

const WrapInput = styled.div`
  box-sizing: content-box;
  width: fit-content;
  height: fit-content;
  margin: 10% auto;
  padding: 4rem;
  font-size: 1.5rem;
  align-items: center;
  border: 1px solid grey;
  border-radius: 2rem;
  background-color: white;
`;
function Login() {
  return (
    <div>
      <WrapInput>
        로그인
        <Input width='15rem' height='2.8rem' placeholder='아이디' />
        <Input
          width='15rem'
          height='2.8rem'
          marignTop='0.5rem'
          placeholder='비밀번호'
        />
        <Button
          width='15rem'
          height='2.5rem'
          margin='2rem 0rem'
          name='로그인'
        />
      </WrapInput>
    </div>
  );
}

export default Login;
