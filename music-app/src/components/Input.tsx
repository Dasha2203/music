import styled from "styled-components";

export const Input = styled.input`
  padding: 16px 20px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  color: var(--darkestColor);
  border-radius: 4px;
  border: 1px solid var(--grayColor);
  outline: none;
  transition: all .3s ease-in-out;
  
  &:focus {
    border: 1px solid var(--blueColor);
    background-color: var(--opacityBlueColor);
  }
  
  &::placeholder {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.2;
    color: var(--darkestColor);
    opacity: 0.5;
  }
`;