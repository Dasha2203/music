import React from "react";
import styled from "styled-components";
import { ReactComponent as LogoIcon } from "../../assets/logo.svg";


//component
export const Logo = () => {
    return(
        <LogoContainer href={'/'} aria-label={"Application logo to home page"}>
            <LogoIcon/>
        </LogoContainer>
    )
}

//style
export const LogoContainer = styled.a`
  display: flex;
  align-items: center;
  width: 88.45px;
  height: 40px;
  
  svg {
    width: 100%;
  }
`;