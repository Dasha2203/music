import React, {useEffect, useState} from 'react';
import {ActiveItem, RadioItem, RadioItems, RadioListsContainer} from "./Style";
import {Genre} from "../../types/genre";
import {TArtist} from "../../types/artist";

export const RadioLists = ({items, defText, active, select, error}: { items: any[], defText: string, active: string, select: (val: any) => void , error: boolean}) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        console.log(open)
    }, [open])
    const selectItem = (genre: Genre) => {
        select(genre);
        setOpen(false)
    }
    return (
        <RadioListsContainer error={error}>
            <ActiveItem onClick={() => setOpen(!open)}>{active || defText}</ActiveItem>
            {open && (<RadioItems className={open ? 'show': ''}>
                {
                    items.map(item => <RadioItem key={item.id} active={item.name === active} onClick={()=>selectItem((item))}>
                        {item.name}
                    </RadioItem>)
                }
            </RadioItems>)}
        </RadioListsContainer>
    )
}