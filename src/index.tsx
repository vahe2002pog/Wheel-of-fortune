import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './pages/App';
import { initApplication } from './helpers/initApplication';
import { LangContextProvider } from './context/LangContext';
import { PopupContextProvider } from './context/popupContext';
import { PlayersContextProvider } from './context/PlayersContext';

initApplication();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <LangContextProvider>
            <PopupContextProvider>
                <PlayersContextProvider>
                    <App />
                </PlayersContextProvider>
            </PopupContextProvider>
        </LangContextProvider>
    </React.StrictMode>
);
