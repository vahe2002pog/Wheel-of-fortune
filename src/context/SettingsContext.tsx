import React, { useMemo } from 'react';
import { useLocalStorage } from '../hook/useLocalStorage';
import { ROTATION_TIME } from '../helpers/constants';

interface ISettingContext {
    rotationTime: number;
    setRotationTime: (rotationTime: number) => void;
}

export const SettingsContext = React.createContext({} as ISettingContext);

export const SettingsContextProvider = ({children}: { children: JSX.Element }) => {

    const [rotationTime, setRotationTime] = useLocalStorage('rotationTime', ROTATION_TIME);

    const value = useMemo(() => {
        return {
            rotationTime, setRotationTime
        };
    }, [rotationTime, setRotationTime]);

    return (
        <SettingsContext.Provider value={value}>
            { children }
        </SettingsContext.Provider>
    );
}
