import React from 'react'
import {AddPlaylistContainer} from "./Style";
import {ReactComponent as IconPlus} from "../../assets/plus.svg";

export const AddPlaylist = () => {
    return (
        <AddPlaylistContainer>
            <IconPlus className={"plus"}/>
        </AddPlaylistContainer>
    )
}