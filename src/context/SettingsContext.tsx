import React, { useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hook/useLocalStorage';
import { ROTATION_TIME } from '../helpers/constants';
import { Snow } from '../helpers/snow';

interface ISettingContext {
    rotationTime: number;
    setRotationTime: (rotationTime: number) => void;
    playersIndexVisible: boolean;
    setPlayersIndexVisible: (playersIndexVisible: boolean) => void;
    newEditor: boolean;
    setNewEditor: (newEditor: boolean) => void;
    monochromeWheel: boolean;
    setMonochromeWheel: (newEditor: boolean) => void;
    legend: boolean;
    setLegend: (newLegend: boolean) => void;
    snowAvailable: boolean;
    snow: boolean;
    setSnow: (newLegend: boolean) => void;
}

const snowModel = new Snow();
export const SettingsContext = React.createContext({} as ISettingContext);

export const SettingsContextProvider = ({children}: { children: JSX.Element }) => {

    const [rotationTime, setRotationTime] = useLocalStorage('rotationTime', ROTATION_TIME);
    const [playersIndexVisible, setPlayersIndexVisible] = useLocalStorage('playersIndexVisible', true);
    const [newEditor, setNewEditor] = useLocalStorage('newEditor', false);
    const [monochromeWheel, setMonochromeWheel] = useLocalStorage('monochromeWheel', false);
    const [legend, setLegend] = useLocalStorage('legend', true);
    const [snow, setSnowVisible] = useLocalStorage('snow', true);

    const setSnow = useCallback((visible: boolean) => {
        setSnowVisible(visible);
        snowModel.toggle(visible);
    }, [setSnowVisible])

    const value = useMemo((): ISettingContext => {
        return {
            rotationTime, setRotationTime,
            playersIndexVisible, setPlayersIndexVisible,
            newEditor, setNewEditor,
            monochromeWheel, setMonochromeWheel,
            legend, setLegend,
            snow, setSnow,
            snowAvailable: snowModel.snowAvailable
        };
    }, [rotationTime, setRotationTime,
        playersIndexVisible, setPlayersIndexVisible,
        newEditor, setNewEditor,
        monochromeWheel, setMonochromeWheel,
        legend, setLegend,
        snow, setSnow
    ]);

    return (
        <SettingsContext.Provider value={value}>
            { children }
        </SettingsContext.Provider>
    );
}
