import React from 'react';
import styled from 'styled-components';

const InputStyle = styled.input`
  /* display: block; */
  box-sizing: content-box;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  /* margin: ${(props) => props.margin}; */
  margin-top: ${(props) => props.marginTop};
  padding: 0rem 1rem;
  border: 1.2px solid grey;
  border-radius: 0.4rem;
  font-size: 1rem;
  /* color: rgba(200, 200, 200); */
`;

export default function Input({
  width,
  height,
  marginTop,
  placeholder,
  onChange,
}) {
  return (
    <div>
      <InputStyle
        width={width}
        height={height}
        // marginTop={marginTop}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
