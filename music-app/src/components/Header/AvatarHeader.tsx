import React, {useContext, useEffect, useState} from 'react';
import {ReactComponent as IconAvatar} from "../../assets/avatar.svg";
import {ReactComponent as IconArrow} from "../../assets/arrowDown.svg";
import {AvatarHeaderContainer, AvatarName} from "./style";
import {DropDown} from "../DropDown/DropDown";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../../context/AppContext";

type Props = {
    name: string;
};
interface Item {
    title: string,
    action: () => void
}

const items = [
    {title: 'Profile', action: () => {}},
    {title: 'Log out', action: () => {}},
    {title: 'Profile', action: () => {}}

]

export const AvatarHeader = ({name}: Props) => {
    let navigate = useNavigate();
    const { logOut } = useContext(AppContext)
    const [items , setItems] = useState<Item[]>([]);

    useEffect(()=> {
        setItems([
            {title: 'Profile', action: () => navigate('/profile')},
            {title: 'Log out', action: () => {
                    logOut()
                    navigate('/login')
                }},
        ])
    },[])

    return (
        <AvatarHeaderContainer>
            <IconAvatar className={'avatar'}/>
            <AvatarName>{name}</AvatarName>
            <IconArrow/>
            <DropDown items={items}/>
        </AvatarHeaderContainer>
    );
}