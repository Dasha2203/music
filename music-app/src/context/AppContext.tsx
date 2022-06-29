import React, {FC, useState} from "react";
import axios, { AxiosError } from "axios";
import useLocalStorage from "../hooks/useLocalStorage";
import {Role} from "../types";

type Context = {
    token: string;
    signIn: (token: string) => void;
    getUserInformation: () => void;
    userInformation: UserData | null;
    setUserInformation: (inf: null | UserData) => void;
    loader: boolean;
    setLoader: (val: boolean) => void;
    isAdmin: boolean;
    logOut: () => void;
    serverConnectionError: boolean;
    setServerConnectionError: (val: boolean) => void;
}


type UserData = {
    id: number
    role: number,
    name: string,
    email: string,
    dateRegister: string,
}

export const AppContext = React.createContext<Context>({
    token: '',
    signIn: (token: string) => {
    },
    getUserInformation: () => {
    },
    userInformation: null,
    setUserInformation: (inf: null | UserData) => undefined,
    loader: false,
    setLoader: (val: boolean) => undefined,
    isAdmin: false,
    logOut: () => undefined,
    serverConnectionError: false,
    setServerConnectionError: (val: boolean) => undefined

})

export const ApplicationProvider= ({ children }: {children: React.ReactNode}) => {
    const [token, setToken] = useLocalStorage('token');
    const [contextModal, setContextModal] = useState<'error' | null>(null);
    const [userInformation, setUserInformation] = useState<UserData | null>(null);
    const [loader, setLoader] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false);
    const [serverConnectionError, setServerConnectionError] = useState(false);

    const getUserInformation = async () => {
        try {
            let res = await axios.get('/auth/user', {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (res.data) {
                setUserInformation(res.data);
                setIsAdmin(res.data.role === Role.Admin);
            }
        } catch (err) {
            console.log(err);

            if (axios.isAxiosError(err)) {
                setServerConnectionError(true);
            }
            
            setContextModal('error')
        }
    }

    const signIn = (token: string) => {
        setToken(token);
    };

    const logOut = () => {
        localStorage.clear();
        setIsAdmin(false);
        setUserInformation(null);

    }

    return (
        <AppContext.Provider
            value={{
                token,
                signIn,
                getUserInformation,
                userInformation,
                setUserInformation,
                loader,
                setLoader,
                isAdmin,
                logOut,
                serverConnectionError,
                setServerConnectionError
            }}
        >
            {children}
        </AppContext.Provider>
    );
}