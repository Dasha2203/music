import React from 'react';
import {ArtistContainer, ArtistImg, ArtistLikes, ArtistName} from "./Styled.elements";
import img1 from "../../assets/imagineDragons.jpeg"
import {ReactComponent as IconLike} from "../../assets/like.svg";
import {TArtist} from "../../types/artist";

export const Artist = ({artist}: {artist: TArtist}) => {
    return (
        <ArtistContainer>
            <ArtistImg>
                { artist.srcImg && <img src={`/${artist.srcImg}`} alt="artist"/>}
            </ArtistImg>
            <ArtistName>{artist.name}</ArtistName>
            {/*<ArtistLikes>*/}
            {/*    <IconLike/> {(120435).toLocaleString('en-US')}*/}
            {/*</ArtistLikes>*/}
        </ArtistContainer>
    )
}