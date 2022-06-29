import styled from 'styled-components';
import {HelperText, Label} from "../UI";

export const InputContainer = styled.div`
  padding-bottom: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
  
  ${Label} {
    display: block;
    margin-bottom: 10px;
  }
  
  ${HelperText} {
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;