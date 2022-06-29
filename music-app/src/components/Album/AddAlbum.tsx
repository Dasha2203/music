import React from 'react'
import {AddAlbumContainer} from "./Style";
import {ReactComponent as IconPlus} from "../../assets/plus.svg";

export const AddAlbum = () => {
    return (
        <AddAlbumContainer>
            <IconPlus className={"plus"}/>
        </AddAlbumContainer>
    )
}