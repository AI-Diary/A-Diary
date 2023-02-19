import React from 'react';
import styled from 'styled-components';

const WrapMenu = styled.div`
  width: 100vw;
  height: 5rem;
  background-color: rgba(256, 256, 256, 0.7);
`;
function Menu() {
  return (
    <div>
      <WrapMenu />
    </div>
  );
}

export default Menu;
