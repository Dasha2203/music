import styled from 'styled-components';
import {breakPointDesc} from "../constantes/variables";
import {PageLineContainer} from "./PageLine/S.el";

export const Container = styled.div`
  padding-left: 26px;
  padding-right: 26px;
  width: 100%;
  
  @media (min-width: ${breakPointDesc}) {
    margin-left: auto;
    margin-right: auto;
    max-width: 1480px;
    
    ${PageLineContainer} {
      &:not(:last-child) {
        margin-bottom: 95px;

      }
    }
  }
`;