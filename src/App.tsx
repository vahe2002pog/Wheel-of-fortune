import React, { useState, useCallback, useMemo } from 'react';
import './App.css';
import './styles/tailwind.min.css';
import Header from './components/header';
import Menu from './components/menu';
import Spinner from './components/spinner';

export default function App() {

    const [spinnerRunning, setSpinnerRunning] = useState(false);

    const items = useMemo(() => {
        return [
            {id: '7', color: '#777', text: 'text-777 long line for overflow'},
            {id: '8', color: '#888', text: 'text-888 long line for overflow'},
            {id: '9', color: '#999', text: 'text-999 long line for overflow'},
            {id: 'a', color: '#aaa', text: 'text-aaa long line for overflow'},
            {id: 'b', color: '#bbb', text: 'text-bbb long line for overflow'},
            {id: 'c', color: '#ccc', text: 'text-ccc long line for overflow'},
            {id: 'd', color: '#ddd', text: 'text-ddd long line for overflow'},
            {id: 'e', color: '#eee', text: 'text-eee long line for overflow'},
            {id: 'f', color: '#fff', text: 'text-fff long line for overflow'}
        ]
    }, []);

    const runSpinner = useCallback(() => setSpinnerRunning(true), [setSpinnerRunning]);
    const stopSpinner = useCallback(() => setSpinnerRunning(false), [setSpinnerRunning]);

    return (
        <>
            <Header />
            <main className='tw-flex tw-flex-1 tw-w-full tw-items-center'>
                <Menu />
                <Spinner
                    spinnerRunning={spinnerRunning}
                    items={items}
                    runSpinner={runSpinner}
                    stopSpinner={stopSpinner}
                />
            </main>
        </>
    );
}
