import React, {useContext} from 'react';
import {AvatarContainer, AvatarImg, AvatarName, AvatarText} from "./Style";
import {AppContext} from "../../context/AppContext";
type Props = {
    srcImg: string,
    name: string
}

export const Avatar = ({srcImg, name}:Props) => {
    const {isAdmin} = useContext(AppContext);

    return (
        <AvatarContainer>
            <AvatarImg>
                {/*<img src=""  alt=""/>*/}
            </AvatarImg>
            <div>
                <AvatarName>
                    {name}
                </AvatarName>
                <AvatarText>
                    {isAdmin ? 'Administrator' : 'User'}
                </AvatarText>
            </div>

        </AvatarContainer>
    )
}