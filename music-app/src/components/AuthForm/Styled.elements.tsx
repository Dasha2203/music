import styled from "styled-components";

import { breakPointDesc } from "../../constantes/variables";
import { Button } from "../Button";
import { Label, SectionTitle } from "../UI";
import { Input } from "../Input";
import { InputContainer } from "../Input/S.el";

export const FormWrap = styled.form`
  margin-top: 120px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 15px;
  display: flex;
  max-width: 660px;
  flex-direction: column;
  border-radius: 4px;
  background-color: var(--textColor);

  ${InputContainer} {
    margin-bottom: 10px;
  }

  ${SectionTitle} {
    justify-conten: center;
  }

  ${Button} {
    margin-top: 19px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    text-transform: uppercase;
    background-color: var(--blueColor);
    border-radius: 60px;
    border: none;
  }

  & > ${Input} {
    margin-bottom: 20px;
    border-radius: 30px;
  }

  & > ${Label} {
    margin-bottom: 5px;
  }

  @media (min-width: ${breakPointDesc}) {
    margin-top: 80px;
    padding: 40px 90px;

    ${InputContainer} {
      margin-bottom: 15px;
    }

    ${Input} {
      border-radius: 4px;
    }

    ${Button} {
      max-width: 320px;
      border-radius: 20px;
    }
  }
`;

export const FormTitle = styled.div`
  margin-bottom: 15px;
  font-size: 28px;
  font-weight: 800;
  color: var(--darkestColor);
  text-align: center;

  @media (min-width: ${breakPointDesc}) {
    margin-bottom: 25px;
    text-align: left;
  }
`;
