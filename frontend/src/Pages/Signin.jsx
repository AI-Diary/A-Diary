import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Components/Button';
import Input from '../Components/Input';

const Wrap = styled.div`
  position: absolute;
  width: 100%;
  height: fit-content;
  background: linear-gradient(
    to bottom,
    rgba(51, 153, 255),
    rgba(178, 102, 255)
  );
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
  box-sizing: content-box;
  width: fit-content;
  height: fit-content;
  margin: 5% auto;
  padding: 2rem 4rem;
  /* border: 1px solid grey; */
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
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [pw1, setPw1] = useState();
  const [pw2, setPw2] = useState();
  const [email, setEmail] = useState();

  const nagivate = useNavigate();
  // const TransMain = () => {
  //   nagivate(`/Main`);
  // };
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeId = (e) => {
    setId(e.target.value);
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
    } else {
      nagivate(`/Main`);
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
            borderRadius='0.4rem'
            placeholder='홍길동'
            backgroundColor='rgba(256, 256, 256, 0.7)'
            onChange={onChangeName}
          />

          <ExplainInput>아이디</ExplainInput>
          <Input
            width='15rem'
            height='2.8rem'
            borderRadius='0.4rem'
            backgroundColor='rgba(256, 256, 256, 0.7)'
            onChange={onChangeId}
          />

          <ExplainInput>비밀번호</ExplainInput>
          <Input
            width='15rem'
            height='2.8rem'
            marignTop='1rem'
            borderRadius='0.4rem'
            backgroundColor='rgba(256, 256, 256, 0.7)'
            onChange={onChangePw1}
            type='password'
          />

          <ExplainInput>비밀번호 확인</ExplainInput>
          <Input
            width='15rem'
            height='2.8rem'
            marignTop='1rem'
            borderRadius='0.4rem'
            backgroundColor='rgba(256, 256, 256, 0.7)'
            onChange={onChangePw2}
            type='password'
          />

          <ExplainInput>이메일</ExplainInput>
          <Input
            width='15rem'
            height='2.8rem'
            marignTop='1rem'
            borderRadius='0.4rem'
            backgroundColor='rgba(256, 256, 256, 0.7)'
            placeholder='example@email.com'
            onChange={onChangeEmail}
            type='email'
          />

          <Button
            width='15rem'
            height='2.5rem'
            margin='3rem 0rem 1.5rem 0rem'
            color='grey'
            border='2px solid grey'
            borderRadius='0.4rem'
            backgroundColor='white'
            name='가입하기'
            onClick={CheckForms}
          />
        </WrapInputs>
      </Wrap>
    </div>
  );
}

export default Signin;
