import React from 'react'
import {AlbumContainer, AlbumImg, AlbumLikes, AlbumName} from "./Style";
import {ReactComponent as IconLike} from "../../assets/like.svg";
import {TPlaylist} from "../../types/playlist";
import {TAlbums} from "../../types/albums";

export const Album = ({album}: {album: TAlbums}) => {
    return (
        <AlbumContainer>
            <AlbumImg>
                {album.srcImg && <img src={`/${album.srcImg}`} alt="track img"/>}
            </AlbumImg>
            <AlbumName>
                {album.name}
            </AlbumName>
            {/*<AlbumLikes>*/}
            {/*    <IconLike/> {(120435).toLocaleString('en-US')}*/}
            {/*</AlbumLikes>*/}
        </AlbumContainer>
    )
}