import React from 'react';
import styled from 'styled-components';

const WrapDiary = styled.div`
  width: fit-content;
  height: fit-content;
  margin-bottom: 2rem;
  padding: 1.2rem;
  border-radius: 1rem;
  background-color: rgba(256, 256, 256, 0.7);
  box-shadow: 0.4rem 0.4rem 1rem rgba(120, 120, 120, 0.3);
  cursor: pointer;
`;
const DiaryImage = styled.div`
  width: 20rem;
  height: 12.7rem;
  background-color: white;
  background-size: 20rem 13rem;
  background-image: ${({ Image }) => `url(${Image})`};
  background-size: 100%;
  background-repeat: none;
  border-radius: 1rem;
`;

const Date = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
`;

const Title = styled.div``;

export default function DiaryCard({ id, key, onClick, diary }) {
  return (
    <WrapDiary id={id} key={key} onClick={onClick}>
      <DiaryImage Image={diary.img} />
      <Date>{diary.date}</Date>
      <Title>{diary.title}</Title>
    </WrapDiary>
  );
}
