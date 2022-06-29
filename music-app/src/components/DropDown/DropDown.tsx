import React from 'react';
import {DropDownContainer, DropDownItem} from "./Style";

interface Item {
    title: string,
    action: () => void
}

type Props = {
    items: Item[]
};

export const DropDown = ({items}: Props) => {
    return (
        <DropDownContainer>
            {
                items.map((item, idx) =>(
                    <DropDownItem key={idx} onClick={item.action}>
                        {item.title}
                    </DropDownItem>
                ))
            }
        </DropDownContainer>
    )
}