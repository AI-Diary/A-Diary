import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  box-sizing: content-box;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  border: ${(props) => props.border};
  border-image: ${(props) => props.borderImage};
  border-radius: ${(props) => props.borderRadius};
  background-clip: padding-box;
  text-align: center;
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  background-color: ${(props) => props.backgroundColor};
  font-family: 'NanumGothic';
  float: ${(props) => props.float};
  margin-top: ${(props) => props.marginTop};
  margin-right: ${(props) => props.marginRight};
  margin-bottom: ${(props) => props.marginBottom};
  margin-left: ${(props) => props.marginLeft};
  cursor: pointer;
  &:hover {
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
