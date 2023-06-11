import React from 'react';
import './App.css';
import './styles/tailwind.min.css';
import Header from './components/header';
import Menu from './components/menu';
import Spinner from './components/spinner';

export default function App() {
    return (
        <>
            <Header />
            <main>
                <Menu />
                <Spinner/>
            </main>
        </>
    );
}
