import React from 'react';
import {AddArtistContainer } from "./Styled.elements";
import {ReactComponent as IconPlus} from "../../assets/plus.svg";

export const AddArtist = () => {
    return (
        <AddArtistContainer>
            <IconPlus className={"plus"}/>
        </AddArtistContainer>
    )
}