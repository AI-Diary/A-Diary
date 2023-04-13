import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  box-sizing: content-box;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  /* padding: 0.2rem 1rem; */
  border: ${(props) => props.border};
  /* border: 1px solid; */
  border-image: ${(props) => props.borderImage};
  border-radius: ${(props) => props.borderRadius};
  /* border-radius: ${(props) => props.borderRadius}; */
  background-clip: padding-box;
  text-align: center;
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  background-color: ${(props) => props.backgroundColor};
  font-family: 'NanumGothic';
  float: ${(props) => props.float};
  cursor: pointer;
  &:hover {
    /* background-color: rgba(256, 256, 256, 0.35); */
    background-color: ${(props) => props.hoverBackgroundColor};
    color: ${(props) => props.hoverColor};
    border: ${(props) => props.hoverBorder};
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
  hoverBackgroundColor,
  hoverColor,
  hoverBorder,
  name,
  onClick,
  float,
  fontSize,
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
      hoverBackgroundColor={hoverBackgroundColor}
      hoverColor={hoverColor}
      hoverBorder={hoverBorder}
      onClick={onClick}
      float={float}
      fontSize={fontSize}
    >
      {name}
    </ButtonStyle>
  );
}
