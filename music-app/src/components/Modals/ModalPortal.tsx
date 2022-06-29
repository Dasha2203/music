import { useEffect, ReactNode, useMemo } from "react";
import {createPortal} from 'react-dom'

// Это два соседних контейнера в DOM
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

export const Portal = ({children}: {children: ReactNode})  => {
   
const div = useMemo(() => document.createElement('div'), []);
    useEffect(() => {
        document.body.appendChild(div);
        return () => {
        document.body.removeChild(div);
        };
    }, []);
 
    return createPortal(
      children,
      div
    );
}

