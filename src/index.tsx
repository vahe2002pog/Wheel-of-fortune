import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initApplication } from './helpers/initApplication';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
initApplication();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
