import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './pages/App';
import { initApplication } from './helpers/initApplication';
import './lang';
import { PopupContextProvider } from './context/popupContext';

initApplication();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <PopupContextProvider>
            <App />
        </PopupContextProvider>
    </React.StrictMode>
);
