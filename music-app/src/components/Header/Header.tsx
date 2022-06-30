import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  HeaderWrap,
  HeaderContainer,
  Navigation,
  NavigationLink,
  RightMenu,
  HamburgerMenu,
  MenuBtn,
  MobileMenu,
  MobileLink,
  MobileMenuFooter,
} from "./style";

import { Button } from "../Button";
import { Logo } from "../Logo/Logo";
import { AvatarHeader } from "./AvatarHeader";

import { AppContext } from "../../context/AppContext";

export const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { userInformation } = useContext(AppContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [mobileMenuOpen]);


  const closeMobileMenu = () => {
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const handleClickLink = (path: string) => {
    closeMobileMenu();
    navigate(path);
  };

  return (
    <HeaderWrap>
      <HeaderContainer>
        <Logo />

        <Navigation>
          <NavigationLink
            active={pathname === "/"}
            onClick={() => handleClickLink("/")}
          >
            Home
          </NavigationLink>
          <NavigationLink
            active={pathname === "/favorites"}
            onClick={() => handleClickLink("/favorites")}
          >
            Favorites
          </NavigationLink>
          <NavigationLink
            active={pathname === "/history"}
            onClick={() => handleClickLink("/history")}
          >
            History
          </NavigationLink>
          <NavigationLink
            active={pathname === "/search"}
            onClick={() => handleClickLink("/search")}
          >
            Search
          </NavigationLink>
        </Navigation>

        <HamburgerMenu>
          <input
            id="menu__toggle"
            type="checkbox"
            checked={mobileMenuOpen}
            onChange={() => false}
          />
          <MenuBtn
            htmlFor="menu__toggle"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            open={mobileMenuOpen}
          >
            <span></span>
          </MenuBtn>
        </HamburgerMenu>

        <MobileMenu className={`menu__box ${mobileMenuOpen ? "active" : null}`}>
          <MobileLink
            active={pathname === "/"}
            onClick={() => handleClickLink("/")}
          >
            Home
          </MobileLink>
          <MobileLink
            active={pathname === "/favorites"}
            onClick={() => handleClickLink("/favorites")}
          >
            Favorites
          </MobileLink>
          <MobileLink
            active={pathname === "/history"}
            onClick={() => handleClickLink("/history")}
          >
            History
          </MobileLink>
          <MobileLink
            active={pathname === "/search"}
            onClick={() => handleClickLink("/search")}
          >
            Search
          </MobileLink>
          {userInformation && (
            <AvatarHeader name={userInformation.name} dropDown={false} />
          )}

          <MobileMenuFooter>
            {userInformation && (
              <Button
                border
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
              >
                Log out
              </Button>
            )}
            {!userInformation && (
              <>
                <Button
                  border
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                >
                  Log in
                </Button>
                <Button
                  border
                  onClick={() => {
                    navigate("/register");
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign up
                </Button>
              </>
            )}
          </MobileMenuFooter>
        </MobileMenu>

        <RightMenu>
          {userInformation && (
            <AvatarHeader name={userInformation.name} dropDown />
          )}
          {!userInformation && (
            <>
              <Button border onClick={() => navigate("/login")}>
                Log in
              </Button>
              <Button border onClick={() => navigate("/register")}>
                Sign up
              </Button>
            </>
          )}
        </RightMenu>

      </HeaderContainer>
    </HeaderWrap>
  );
};
