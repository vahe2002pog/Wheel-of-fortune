import React, { useMemo } from 'react';
import { useLocalStorage } from '../hook/useLocalStorage';
import { ROTATION_TIME } from '../helpers/constants';

interface ISettingContext {
    rotationTime: number;
    setRotationTime: (rotationTime: number) => void;
    playersIndexVisible: boolean;
    setPlayersIndexVisible: (playersIndexVisible: boolean) => void;
}

export const SettingsContext = React.createContext({} as ISettingContext);

export const SettingsContextProvider = ({children}: { children: JSX.Element }) => {

    const [rotationTime, setRotationTime] = useLocalStorage('rotationTime', ROTATION_TIME);
    const [playersIndexVisible, setPlayersIndexVisible] = useLocalStorage('playersIndexVisible', true);

    const value = useMemo((): ISettingContext => {
        return {
            rotationTime, setRotationTime,
            playersIndexVisible, setPlayersIndexVisible
        };
    }, [rotationTime, setRotationTime, playersIndexVisible, setPlayersIndexVisible]);

    return (
        <SettingsContext.Provider value={value}>
            { children }
        </SettingsContext.Provider>
    );
}
