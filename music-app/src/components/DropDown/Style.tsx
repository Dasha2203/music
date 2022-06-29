import styled from "styled-components";

export const DropDownContainer = styled.div`
  background-color: var(--mediumDarkColor);
  border-radius: 8px;
`;

export const DropDownItem = styled.div`
  padding: 10px 16px;
  color: var(--textColor);
  font-size: 16px;
  text-align: left;
  transition: all .3s ease;
  cursor: pointer;

  &:hover {
    color: var(--lightBlueColor);
  }
`;