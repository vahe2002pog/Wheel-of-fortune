import React, { useMemo } from 'react';
import { TSetOpen, useOpener } from '../hook/useOpener';

interface IContextValue {
    openPopup: TSetOpen;
    popupContent: JSX.Element;
}

export const PopupContext = React.createContext({} as IContextValue);

export const PopupContextProvider = ({children}: { children: JSX.Element }) => {

    const [ popupContent, openPopup ] = useOpener();
    const value = useMemo(() => ({ openPopup, popupContent }), [openPopup, popupContent]);

    return (
        <PopupContext.Provider value={value}>
            <div className='tw-flex tw-flex-col tw-h-full tw-w-full'>
                { children }
            </div>
            { popupContent }
        </PopupContext.Provider>
    );
}
