import styled from "styled-components";


export const ActiveItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  user-select: none;
  color: var(--textColor);
  font-size: 18px;
  font-weight: 700;
`;
export const RadioItem = styled.div<{active?: boolean}>`
  padding: 10px 15px;
  color: var(--textColor);
  cursor: pointer;
  user-select: none;
  background-color: ${props => props.active ? 'var(--grayColor)' : 'var(--darkColor)'};
  //transition: all .3s ease;
  
  &:hover {
    background-color: var(--grayColor);
  }
`;

export const RadioItems = styled.div`
  position: absolute;
  width: 100%;
  height: 200px;
  left: 0;
  top: 100%;
  background-color: var(--darkGrayColor);
  z-index: 900;
  overflow-y: scroll;
  visibility: hidden;
  transition: all .3s ease;
  opacity: 0;
  
  &.show {
    visibility: visible;
    opacity: 1;
  }
`;
export const RadioListsContainer = styled.div<{error: boolean}>`
  position: relative;
  text-align: left;
  background-color: var(--darkGrayColor);
  border-radius: 8px;
  border: 1px solid ${props => props.error ? 'red' : 'var(--grayColor)'};
`;