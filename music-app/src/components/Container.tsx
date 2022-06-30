import styled from "styled-components";
import { breakPointDesc } from "../constantes/variables";
import { PageLineContainer } from "./PageLine/S.el";

export const Container = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
  width: 100%;
  z-index: 2;

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
