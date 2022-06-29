import React from 'react'
import {TrackContainer, TrackImg, TrackLikes, TrackName} from "./S.el";
import img1 from "../../assets/playlistbg.png"
import {ReactComponent as IconLike} from "../../assets/like.svg";
import {TPlaylist} from "../../types/playlist";

export const Track = ({playlist}: {playlist: TPlaylist}) => {
    return (
        <TrackContainer>
            <TrackImg>
                {playlist.srcImg && <img src={playlist.srcImg} alt="track img"/>}

            </TrackImg>
            <TrackName>
                {playlist.name}
            </TrackName>
            <TrackLikes>
                <IconLike/> {(120435).toLocaleString('en-US')}
            </TrackLikes>
        </TrackContainer>
    )
}