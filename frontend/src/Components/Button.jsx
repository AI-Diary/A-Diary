import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  box-sizing: content-box;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: 0.2rem 1rem;
  border: ${(props) => props.border};
  /* border: 1px solid; */
  border-image: ${(props) => props.borderImage};
  border-radius: 10rem;
  /* border-radius: ${(props) => props.borderRadius}; */
  background-clip: padding-box;
  text-align: center;
  /* font-size: 1rem; */
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  background-color: ${(props) => props.backgroundColor};
  font-family: 'NanumGothic';
  cursor: pointer;
  &:hover {
    background-color: rgba(256, 256, 256, 0.35);
    transition: 0.5s;
  }
`;

export default function Button({
  width,
  height,
  margin,
  color,
  border,
  borderImage,
  borderRadius,
  background,
  backgroundColor,
  name,
  onClick,
}) {
  return (
    <ButtonStyle
      width={width}
      height={height}
      margin={margin}
      color={color}
      border={border}
      borderImage={borderImage}
      borderRadius={borderRadius}
      background={background}
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {name}
    </ButtonStyle>
  );
}
