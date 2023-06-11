import React, {useCallback, useMemo}  from "react";
import SpinnerFrontSvg from "./spinnerFrontSvg";
import SpinnerBackSvg from "./spinnerBackSvg";

export default function Spinner() {

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
    
    const runSpinner = useCallback(() => {
        console.log('run');
    }, []);

    return (
        <div className="spinner tw-flex tw-flex-col tw-h-full tw-w-full">
            <div className="winder-field tw-truncate tw-w-full">
                win player
            </div>
            <div className="tw-relative">
                <SpinnerBackSvg className="spinner-back" items={items}/>
                <SpinnerFrontSvg className="spinner-front tw-absolute tw-h-full tw-w-full" runSpinner={runSpinner}/>
            </div>
        </div>
    );
}
