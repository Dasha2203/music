import React from "react";
import {SmallCardContainer, Title} from "./S.el";
import genre from "../../assets/genre.png"

export const SmallCard = ({genre}: {genre: {name: string, srcImage: string | null}}) => {
    return (
        <SmallCardContainer>
            {genre.srcImage && <img src={genre.srcImage} alt="genre image"/>}
            <Title>{genre.name}</Title>
        </SmallCardContainer>
    )
}