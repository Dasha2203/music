import styled from "styled-components";

export const Img = styled.div`
  position: relative;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70px;
  overflow: hidden;
  font-size: 20px;
  color: var(--grayColor);
  
  input {
    display: none;
  }
  
  label {
    position: absolute;
    top:0;
    left:0;
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  
  img {
    display: block;
    margin-right: auto;
    width: 150px;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

export const UploadMusicContainer = styled.div<{selected: boolean, error?: boolean}>`
  cursor: pointer;
  border-radius: 8px;
  border: ${props => props.error ? '1px dashed red': !props.selected ? '1px dashed var(--grayColor)' :  'none'};
  transition: all .3s ease;


  &:hover {
    transform: ${props => !props.selected ? 'scale(1.05)': 'scale(1)'};
  }
`