import styled, {css} from "styled-components";
import { LogoContainer } from "../Logo/Logo";
import { DropDownContainer } from "../DropDown/Style";
import { breakPointTab } from "../../constantes/variables";
import { Button as Btn } from "../Button";

export const HeaderWrap = styled.div`
  padding: 22px 0;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  background: ${(props) => props.theme.header.bgColor};
  z-index: 1000;

  ${LogoContainer} {
    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const HeaderContainer = styled.div`
  margin: 0 auto;
  padding-left: 40px;
  padding-right: 40px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1791px;

  ${LogoContainer} {
    margin-right: 45px;
  }
`;

export const NavigationLink = styled.a<{active: boolean}>`
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
    transition: all 0.3s ease;
  }

  ${props => props.active && css`
    &::after {
      background-color: var(--lightBlueColor);
    }
    `
  };

  &:hover {
    &::after {
      background-color: var(--lightBlueColor);
    }
  }
`;

export const Navigation = styled.nav`
  display: none;
  align-items: center;

  ${NavigationLink}:not(:last-child) {
    margin-right: 30px;
  }

  @media (min-width: ${breakPointTab}) {
    display: flex;
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
  background-image: linear-gradient(
    99deg,
    rgba(202, 66, 242, 1) 0%,
    rgba(66, 181, 242, 1) 54%
  );
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-image: linear-gradient(
      99deg,
      rgba(66, 181, 242, 1) 0%,
      rgba(202, 66, 242, 1) 54%
    );
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
  display: none;

  button {
    margin-left: 30px;
  }

  @media (min-width: ${breakPointTab}) {
    display: block;
  }
`;

export const AvatarHeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--darkestColor);
  cursor: pointer;

  .avatar {
    transition: all 0.3s ease;
  }

  ${DropDownContainer} {
    margin-top: 20px;
    position: absolute;
    top: 50%;
    left: 0;
    min-width: 100%;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s ease;
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

export const AvatarName = styled.div`
  margin-left: 15px;
  margin-right: 15px;
  max-width: 100px;
  color: var(--textColor);
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MobileMenuFooter = styled.div`
  margin-top: auto;
  padding-bottom: 30px;
`;

export const MobileMenu = styled.div`
  position: fixed;
  top: 80px;
  right: -100%;
  margin: 0;
  padding-top: 30px;
  padding-bottom: 0;
  display: flex;
  width: 100%;
  height: calc(100% - 80px);
  flex-direction: column;
  background: ${(props) => props.theme.header.bgColor};
  visibility: hidden;
  overflow-y: scroll;
  list-style: none;
  text-align: center;
  transition-duration: 0.25s;

  &.active {
    visibility: visible;
    right: 0;
  }

  ${AvatarHeaderContainer} {
    margin-top: 40px;
    justify-content: center;
  }

  ${Btn} {
    margin: 0 auto 15px;
    display: block;
    width: 100%;
    max-width: 300px;
  }
`;

export const MobileLink = styled.a<{active: boolean}>`
  margin-bottom: 25px;
  display: block;
  font-size: 22px;
  font-weight: 700;
  color: ${props => props.active ? 'var(--lightBlueColor)' : 'var(--textColor)'};
`;

export const MenuBtn = styled.label<{ open?: boolean }>`
  display: none;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  left: 0px;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: all 0.3s ease;

  & > span,
  & > span::before,
  & > span::after {
    display: block;
    position: absolute;
    height: 3px;
    border-radius: 2px;
    transition-duration: 0.25s;
  }

  & > span {
    background: transparent;
    width: 100%;
  }
  & > span::before {
    content: "";
    top: -5px;
    background: var(--textColor);
    width: 100%;
  }
  & > span::after {
    content: "";
    top: 5px;
    background: var(--textColor);
    width: 17px;
    right: 0;
  }

  @media (max-width: 1180px) {
    display: flex;
  }
`;

export const HamburgerMenu = styled.div<{ auth?: boolean }>`
  position: relative;
  margin-right: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
  margin-right: ${(props) => (props.auth ? "40px" : "0")};
  width: 44px;
  height: 44px;

  #menu__toggle {
    opacity: 0;
    height: 0;
    width: 0;
  }

  #menu__toggle:checked ~ ${MenuBtn} > span {
    transform: rotate(45deg);
    width: 17px;
  }
  #menu__toggle:checked ~ ${MenuBtn} > span::before {
    top: 0;
    transform: rotate(0);
    width: 17px;
  }
  #menu__toggle:checked ~ ${MenuBtn} > span::after {
    top: 0;
    transform: rotate(90deg);
  }
  #menu__toggle:checked ~ ${MobileMenu} {
    visibility: visible;
    top: 68px;
  }

  @media (min-width: ${breakPointTab}) {
    display: none;
  }
  @media (max-width: 596px) {
    margin-right: ${(props) => (props.auth ? "20px" : "0")};
  }
`;
