import React, { useMemo } from 'react';
import { TSetOpen, useOpener } from '../hook/useOpener';

interface IContextValue {
    openPopup: TSetOpen;
}

export const PopupContext = React.createContext({} as IContextValue);

export const PopupContextProvider = ({children}: { children: JSX.Element }) => {

    const [ opener, openPopup ] = useOpener();

    const value = useMemo(() => {
        return {
            openPopup: openPopup
        };
    }, [openPopup]);

    return (
        <PopupContext.Provider value={value}>
            { children }
            { opener }
        </PopupContext.Provider>
    );
}
