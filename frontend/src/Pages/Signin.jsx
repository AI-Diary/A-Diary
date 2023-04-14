import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../Components/Button';
import Input from '../Components/Input';

const Wrap = styled.div`
  /* position: absolute; */
  width: 100vw;
  min-width: 60rem;
  min-height: 100vh;
  height: fit-content;
  border: 0.1px solid transparent;
  background: linear-gradient(
    to bottom,
    rgba(51, 153, 255),
    rgba(178, 102, 255)
  );
  font-family: 'NanumGothic';
`;

const WrapTitle = styled.div`
  width: fit-content;
  margin: 2rem auto;
  font-size: 1.5rem;
  font-weight: bold;
  align-items: center;
  /* border: 1px solid black; */
`;
const WrapInputs = styled.div`
  /* border: 1px solid grey; */
  box-sizing: content-box;
  width: fit-content;
  height: fit-content;
  margin: 5% auto;
  padding: 2rem 4rem;
  border-radius: 2rem;
  background-color: rgba(256, 256, 256, 0.85);
  box-shadow: 0.4rem 0.4rem 1rem rgba(120, 120, 120, 0.3);
`;

const ExplainInput = styled.div`
  /* width: 4rem; */
  height: fit-content;
  margin: 2rem 0rem 0.5rem 0rem;
  /* border: 1px solid blue; */
`;

function Signin() {
  // 아이디, 비밀번호 정규식
  const resPass = new RegExp(/^(?=.*[A-Za-z])(?=.*[0-9]).{8,16}$/);
  // 이메일 정규식
  const resEmail = new RegExp(
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
  );
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [pw1, setPw1] = useState();
  const [pw2, setPw2] = useState();
  const [email, setEmail] = useState();
  const [checkId, setCheckId] = useState(false);

  const navigate = useNavigate();

  // onChange~~ input값 받기
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeId = (e) => {
    setId(e.target.value);
    setCheckId(false);
  };
  const onChangePw1 = (e) => {
    setPw1(e.target.value);
  };
  const onChangePw2 = (e) => {
    setPw2(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  // 아이디 정규식 체크
  const onClickCheckId = () => {
    // || 추가 예정 뒤에 axios로 받아서 검사 후 true로 바꾸기
    if (!resPass.test(id)) {
      // console.log('조건 미달');
      alert('영문 숫자 조합 8~16자로 설정해 주십시오.');
    } else {
      // console.log(id);
      axios
        .post(`http://127.0.0.1:5000/idcheck`, {
          id: id,
        })
        .then((res) => {
          if (res.data.message === '사용 가능한 아이디입니다.') {
            console.log(res);
            setCheckId(true);
            alert(res.data.message);
          } else if (res.data.message === '사용 가능한 아이디입니다.') {
            console.log(res);
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // 비밀번호 정규식 체크
  const onCheckPwReg = () => {
    console.log('check pw :', pw1);
    if (resPass.test(pw1)) {
      console.log('된당!');
      return true;
    } else {
      console.log('아직이당!');
    }
  };

  // 이메일 정규식 체크
  const onCheckEmailReg = () => {
    console.log('check email :', email);
    if (resEmail.test(email)) {
      console.log('된당!');
      return true;
    } else {
      console.log('아직이당!');
    }
  };

  // 가입하기 버튼 누르면 조건 확인
  const CheckForms = () => {
    console.log(
      '이름 : ',
      name,
      ' 아이디 : ',
      id,
      ' pw1 : ',
      pw1,
      ' pw2 : ',
      pw2,
      ' email : ',
      email
    );

    if (!name || !id || !pw1 || !pw2 || !email) {
      alert('빈 칸을 모두 입력해주세요');
    } else if (pw1 !== pw2) {
      alert('비밀번호를 다시 입력해주세요');
    } else if (checkId === false) {
      alert('아이디 중복 확인을 해주세요');
    } else if (!onCheckPwReg()) {
      alert('비밀번호 조합을 확인해 주세요');
    } else if (!onCheckEmailReg()) {
      alert('이메일을 확인해 주세요');
    } else {
      axios
        .post(`http://127.0.0.1:5000/signin`, {
          username: name,
          id: id,
          pw: pw1,
          email: email,
        })
        .then((res) => {
          console.log(res);
          alert('회원가입에 성공했습니다.');
          // navigate(`/Main`);
          navigate('/Login');
        })
        .catch((err) => {
          console.log(err);
          alert('회원가입에 실패했습니다.');
        });
    }
  };
  return (
    <div>
      <Wrap>
        <WrapInputs>
          <WrapTitle>회원가입</WrapTitle>

          <ExplainInput>이름</ExplainInput>
          <Input
            width='15rem'
            height='2.8rem'
            border='1.5px solid grey'
            borderRadius='0.4rem'
            placeholder='홍길동'
            backgroundColor='rgba(256, 256, 256, 0.7)'
            onChange={onChangeName}
          />

          <ExplainInput>아이디</ExplainInput>
          <Input
            width='15rem'
            height='2.8rem'
            border='1.5px solid grey'
            borderRadius='0.4rem'
            placeholder='영문, 숫자 조합 8자리 이상 16자리 이하'
            backgroundColor='rgba(256, 256, 256, 0.7)'
            onChange={onChangeId}
            maxLength='16'
          />
          <Button
            width='16.2rem'
            height='2.8rem'
            color='rgba(108, 132, 247)'
            name='아이디 중복 확인'
            background='white'
            hoverBackgroundColor='rgba(108, 132, 247)'
            hoverColor='white'
            hoverBorder='2px solid rgba(108, 132, 247)'
            border='2px solid rgba(108, 132, 247)'
            borderRadius='10rem'
            // margin='0.5rem 2.5rem 0rem'
            margin='0.5rem 0rem 0rem 0rem'
            fontSize='0.8rem'
            onClick={onClickCheckId}
          />

          <ExplainInput>비밀번호</ExplainInput>
          <Input
            width='15rem'
            height='2.8rem'
            marignTop='1rem'
            border='1.5px solid grey'
            borderRadius='0.4rem'
            placeholder='영문, 숫자 조합 8자리 이상 16자리 이하'
            backgroundColor='rgba(256, 256, 256, 0.7)'
            onChange={onChangePw1}
            type='password'
            maxLength='16'
          />

          <ExplainInput>비밀번호 확인</ExplainInput>
          <Input
            width='15rem'
            height='2.8rem'
            marignTop='1rem'
            border='1.5px solid grey'
            borderRadius='0.4rem'
            placeholder='비밀번호를 한번 더 입력해주세요'
            backgroundColor='rgba(256, 256, 256, 0.7)'
            onChange={onChangePw2}
            type='password'
            maxLength='16'
          />

          <ExplainInput>이메일</ExplainInput>
          <Input
            width='15rem'
            height='2.8rem'
            marignTop='1rem'
            border='1.5px solid grey'
            borderRadius='0.4rem'
            backgroundColor='rgba(256, 256, 256, 0.7)'
            placeholder='example@email.com'
            onChange={onChangeEmail}
            type='email'
          />

          <Button
            width='16.2rem'
            height='2.8rem'
            margin='2rem 0rem 1.5rem 0rem'
            color='rgba(153, 111, 247)'
            border='2px solid rgba(153, 111, 247)'
            borderRadius='10rem'
            backgroundColor='white'
            hoverBackgroundColor='rgba(153, 111, 247)'
            hoverColor='white'
            hoverBorder='2px solid rgba(153, 111, 247)'
            name='가입하기'
            onClick={CheckForms}
          />
        </WrapInputs>
      </Wrap>
    </div>
  );
}

export default Signin;
