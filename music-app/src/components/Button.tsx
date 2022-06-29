import styled, {css} from "styled-components";

export const Button = styled.button<{border?: boolean}>`
  padding: 10px;
  font-size: 16px;
  line-height: 1.2;
  font-weight: bold;
  color: var(--textColor);
  border: none;
  cursor: pointer;
  background-color: var(--blueColor);
  border-radius: 20px;
  transition: all .3s ease;
  
  ${props => {
      if (props.border) {
          return css`
            border: 1px solid var(--textColor);
            color: var(--grayColor);
            background-color: transparent;

            &:hover {
              transform: scale(1.1);
              color: var(--blueColor);
              border-color: var(--blueColor);
            }
          `
      }
  }}

  &:disabled {
    background-color: grey !important;
  }
  
`;