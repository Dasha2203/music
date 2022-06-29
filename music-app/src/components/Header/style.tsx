import styled from "styled-components";
import {LogoContainer} from "../Logo/Logo";
import {DropDownContainer} from "../DropDown/Style";

export const HeaderWrap = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 22px 0;
  width: 100%;
  background: ${props => props.theme.header.bgColor}; 
  z-index: 1000;
`;

export const HeaderContainer = styled.div`
  margin: 0 auto;
  padding-left: 40px;
  padding-right: 90px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1791px;
  
  ${LogoContainer} {
    margin-right: 43.5px;
  }
`;

export const NavigationLink = styled.a`
  position: relative;
  font-size: 20px;
  font-weight: bold;
  color: var(--grayColor);
  cursor: pointer;
  
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: calc(100% + 2px);
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: transparent;
    transition: all .3s ease;
  }
  
  &:hover {
    &::after {
      background-color: var(--lightBlueColor);
    }
  }
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  
  ${NavigationLink}:not(:last-child) {
    margin-right: 30px;
  }
`;

export const Button = styled.button`
  padding-top: 2px;
  padding-right: 2px;
  padding-left: 2px;
  padding-bottom: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 40px;
  background-color: transparent;
  background-image: linear-gradient(99deg, rgba(202,66,242,1) 0%, rgba(66,181,242,1) 54%);
  cursor: pointer;
  transition: all .3s ease-in-out;
  
  &:hover {
    background-image: linear-gradient(99deg, rgba(66,181,242,1) 0%, rgba(202,66,242,1)  54%);

  }
  
  span {
    padding-top: 2px;
    padding-right: 24px;
    padding-left: 24px;
    padding-bottom: 6px;
    display: block;
    font-size: 20px;
    font-weight: bold;
    color: var(--lightBlueColor);
    background-color: var(--darkestColor);
    border-radius: 40px;
  }
`;

export const RightMenu = styled.div`
  margin-left: auto;
  
  button {
    margin-left: 30px;
  }
`;

export const AvatarHeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--darkestColor);
  cursor: pointer;
  
  .avatar {
    transition: all .3s ease;
  }

  ${DropDownContainer} {
    margin-top: 20px;
    position: absolute;
    top: 50%;
    left: 0;
    min-width: 100%;
    opacity: 0;
    visibility: hidden;
    transition: all .4s ease;
  }
  
  &:hover {
    .avatar {
      transform: scale(1.1);
    }
    
    ${DropDownContainer} {
      opacity: 1;
      visibility: visible;
      top: 100%;
    }
  }

  
`;

export const AvatarName= styled.div`
  margin-left: 15px;
  margin-right: 15px;
  color: var(--textColor);
  font-size: 16px;
`;



