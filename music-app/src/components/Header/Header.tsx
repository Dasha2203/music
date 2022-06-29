import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import {HeaderWrap, HeaderContainer, Navigation, NavigationLink, RightMenu} from "./style";
import {AppContext} from "../../context/AppContext";
import {Button} from "../Button";
import {Logo} from "../Logo/Logo";
import {AvatarHeader} from "./AvatarHeader";

export const Header = () => {
    const {token, userInformation} = useContext(AppContext);
    let navigate = useNavigate();

    return (
        <HeaderWrap>
            <HeaderContainer>
                <Logo/>
                <Navigation>
                    <NavigationLink href={"/"}>
                        Home
                    </NavigationLink>
                    <NavigationLink href={"/favorites"}>
                        Favorites
                    </NavigationLink>
                    <NavigationLink  onClick={() => navigate('/history')}>
                        History
                    </NavigationLink>
                    <NavigationLink href={"/search"}>
                        Search
                    </NavigationLink>
                    {/*<Button>*/}
                    {/*    <span>Browse</span>*/}
                    {/*</Button>*/}
                </Navigation>
                <RightMenu>
                    {userInformation && <AvatarHeader name={userInformation.name}/>}
                    {!userInformation && (
                        <>
                            <Button border onClick={() =>navigate('/login')}>Log in</Button>
                            <Button border onClick={() =>navigate('/register')}>Sign up</Button>
                        </>
                    )}
                </RightMenu>
            </HeaderContainer>
        </HeaderWrap>
    )
}