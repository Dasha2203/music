import styled from "styled-components";

export const LoaderWrap = styled.div`
    
    width: 200px;
    height: 200px;
`;

export const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .4);
  z-index: 1010;
`;