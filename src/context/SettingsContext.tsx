import React, { useMemo } from 'react';
import { useLocalStorage } from '../hook/useLocalStorage';
import { ROTATION_TIME } from '../helpers/constants';

interface ISettingContext {
    rotationTime: number;
    setRotationTime: (rotationTime: number) => void;
    playersIndexVisible: boolean;
    setPlayersIndexVisible: (playersIndexVisible: boolean) => void;
    newEditor: boolean;
    setNewEditor: (newEditor: boolean) => void;
    monochromeWheel: boolean;
    setMonochromeWheel: (newEditor: boolean) => void;
}

export const SettingsContext = React.createContext({} as ISettingContext);

export const SettingsContextProvider = ({children}: { children: JSX.Element }) => {

    const [rotationTime, setRotationTime] = useLocalStorage('rotationTime', ROTATION_TIME);
    const [playersIndexVisible, setPlayersIndexVisible] = useLocalStorage('playersIndexVisible', true);
    const [newEditor, setNewEditor] = useLocalStorage('newEditor', false);
    const [monochromeWheel, setMonochromeWheel] = useLocalStorage('monochromeWheel', false);

    const value = useMemo((): ISettingContext => {
        return {
            rotationTime, setRotationTime,
            playersIndexVisible, setPlayersIndexVisible,
            newEditor, setNewEditor,
            monochromeWheel, setMonochromeWheel
        };
    }, [rotationTime, setRotationTime,
        playersIndexVisible, setPlayersIndexVisible,
        newEditor, setNewEditor,
        monochromeWheel, setMonochromeWheel
    ]);

    return (
        <SettingsContext.Provider value={value}>
            { children }
        </SettingsContext.Provider>
    );
}
