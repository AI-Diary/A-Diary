import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Components/Button';
const Wrap = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    rgba(51, 153, 255),
    rgba(178, 102, 255)
  );
`;
const Welcome = styled.div`
  margin-top: 10rem;
  color: white;
  font-size: 4rem;
  text-align: center;
`;

const WrapButtons = styled.div`
  width: fit-content;
  height: fit-content;
  margin: auto;
`;
function Default() {
  const nagivate = useNavigate();
  const TransLogin = () => {
    nagivate(`/Login`);
  };
  const TransSignin = () => {
    nagivate(`/Signin`);
  };
  return (
    <div>
      <Wrap>
        <Welcome>Welcome to A-Diary</Welcome>
        <WrapButtons>
          <Button
            width='7rem'
            height='2.5rem'
            margin='4rem 1rem'
            name='로그인'
            color='white'
            backgroundColor='transparent'
            onClick={TransLogin}
          />
          <Button
            width='7rem'
            height='2.5rem'
            margin='4rem 1rem'
            name='회원가입'
            color='white'
            backgroundColor='transparent'
            onClick={TransSignin}
          />
        </WrapButtons>
      </Wrap>
    </div>
  );
}

export default Default;
