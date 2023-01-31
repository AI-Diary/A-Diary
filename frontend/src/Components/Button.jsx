import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  box-sizing: content-box;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: 0.2rem 1rem;
  border: 1px solid grey;
  border-radius: 10rem;
  text-align: center;
  font-size: 1rem;
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  background: ${(props) => props.backgroundColor};
`;

export default function Button({
  width,
  height,
  margin,
  color,
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
      background={background}
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {name}
    </ButtonStyle>
  );
}
