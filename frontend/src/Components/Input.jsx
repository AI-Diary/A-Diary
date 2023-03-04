import React from 'react';
import styled from 'styled-components';

const InputStyle = styled.input`
  box-sizing: content-box;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-top: ${(props) => props.marginTop};
  padding: 0rem 1rem;
  border: 1.3px solid grey;
  border-style: ${(props) => props.borderStyle};
  border-radius: ${(props) => props.borderRadius};
  background-color: ${(props) => props.backgroundColor};
  font-size: ${(props) => props.fontSize};
  font-family: 'NanumGothic';
  color: ${(props) => props.color};
`;

export default function Input({
  width,
  height,
  placeholder,
  onChange,
  color,
  borderStyle,
  borderRadius,
  backgroundColor,
  type,
  fontSize,
  maxLength,
}) {
  return (
    <div>
      <InputStyle
        width={width}
        height={height}
        placeholder={placeholder}
        onChange={onChange}
        color={color}
        borderStyle={borderStyle}
        borderRadius={borderRadius}
        backgroundColor={backgroundColor}
        type={type}
        fontSize={fontSize}
        maxLength={maxLength}
      />
    </div>
  );
}
