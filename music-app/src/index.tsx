import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemesProvider} from "./context/ThemeContext";
import {BrowserRouter} from "react-router-dom";
import {ApplicationProvider} from "./context/AppContext";
import {MusicProvider} from "./context/MusicContext";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemesProvider>
                <ApplicationProvider>
                    <MusicProvider>
                        <App/>
                    </MusicProvider>
                </ApplicationProvider>
            </ThemesProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
