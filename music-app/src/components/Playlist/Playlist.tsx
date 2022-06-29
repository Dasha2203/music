import React from 'react'
import {PlaylistContainer, PlaylistImg, PlaylistLikes, PlaylistName} from "./Style";
import {ReactComponent as IconLike} from "../../assets/like.svg";
import {TPlaylist} from "../../types/playlist";

export const Playlist = ({playlist}: {playlist: TPlaylist}) => {
    return (
        <PlaylistContainer>
            <PlaylistImg>
                {playlist.srcImg && <img src={playlist.srcImg} alt="track img"/>}
            </PlaylistImg>
            <PlaylistName>
                {playlist.name}
            </PlaylistName>
            {/*<PlaylistLikes>*/}
            {/*    <IconLike/> {(120435).toLocaleString('en-US')}*/}
            {/*</PlaylistLikes>*/}
        </PlaylistContainer>
    )
}