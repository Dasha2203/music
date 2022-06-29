import React, {FC, useState} from 'react';
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../theme/theme";

type Context = {
    theme: string;
    toggleTheme: () => void;
}

const initialState = {
    theme: "dark",
    toggleTheme: () => undefined
}

export const ThemeContext = React.createContext<Context>(initialState);

export const ThemesProvider = ({children}: {children: React.ReactNode}) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
            localStorage.setItem("theme", "dark")
        } else {
            setTheme("light")
            localStorage.setItem("theme", "light")
        }
    }

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                {children}
            </ThemeContext.Provider>
        </ThemeProvider>
    );
}