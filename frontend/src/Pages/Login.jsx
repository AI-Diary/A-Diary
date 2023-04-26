import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../Components/Button';
import Input from '../Components/Input';

const Wrap = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  min-width: 60rem;
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
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  // 회원가입 페이지 이동
  const navigate = useNavigate();
  const NavigateToSignin = () => {
    navigate('/Signin');
  };

  // 메인 페이지 이동
  const NavigateToMain = () => {
    navigate('/Main');
  };

  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangePw = (e) => {
    setPw(e.target.value);
  };
  // console.log('id : ', id, ' pw : ', pw);

  const onClickLogin = () => {
    if (!id) {
      alert('아이디를 입력해 주세요.');
    } else if (!pw) {
      alert('비밀번호를 입력해 주세요.');
    } else {
      // id, pw 담아서 서버 보내기
      const data = { id: id, pw: pw };
      axios
        .post(`http://127.0.0.1:5000/login`, data)
        .then((res) => {
          // 성공시
          console.log('data : ', data);
          if (res.data === 'fail') {
            alert('로그인에 실패했습니다.');
            console.log('로그인에 실패했습니다.');
          } else {
            alert('로그인에 성공했습니다.');
            //res에 user정보도 받아서 Main에 보내는 거로 수정
            console.log('userid : ', res.data);
            NavigateToMain();
          }
        })
        .catch((err) => {
          // 실패시
          alert('로그인에 실패하였습니다.');
          console.log(err);
        });
    }
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
            border='1.5px solid grey'
            borderRadius='0.4rem 0.4rem 0rem 0rem'
            backgroundColor='rgba(256, 256, 256, 0.7)'
            borderStyle='solid solid none solid'
            onChange={onChangeId}
          />

          <Input
            width='15rem'
            height='2.8rem'
            placeholder='비밀번호'
            border='1.5px solid grey'
            borderRadius='0rem 0rem 0.4rem 0.4rem'
            backgroundColor='rgba(256, 256, 256, 0.7)'
            onChange={onChangePw}
            type='password'
          />

          <Button
            width='16rem'
            height='2.9rem'
            margin='1.5rem 0rem 0rem 0rem'
            name='로그인'
            border='2px solid rgba(115, 133, 255)'
            borderRadius='10rem'
            background='white'
            hoverBackgroundColor='rgba(115, 133, 255)'
            hoverBorder='2px solid rgba(115, 133, 255)'
            hoverColor='white'
            color='rgba(115, 133, 255)'
            onClick={onClickLogin}
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
