import React from "react";
import { Title, AddSmallCardContainer} from "./S.el";
import genre from "../../assets/genre.png"
import {ReactComponent as IconPlus} from "../../assets/plus.svg"

export const AddSmallCard = ({title}: {title: string}) => {
    return (
        <AddSmallCardContainer>
            <IconPlus className={"plus"}/>
        </AddSmallCardContainer>
    )
}