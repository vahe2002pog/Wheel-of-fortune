import React, { ChangeEvent, useContext } from 'react';
import { useTranslation } from '../hook/useTranslation';
import { PlayersContext } from '../context/PlayersContext';
import { SettingsContext } from '../context/SettingsContext';

interface IProps {
    disabled: boolean;
}

export default function Legend(props: IProps) {
    const { tr } = useTranslation();
    const { legend, setLegend } = useContext(PlayersContext);
    const { playersIndexVisible } = useContext(SettingsContext);

    return (
        <div className={`legend-wrapper ${playersIndexVisible ? 'legend-wrapper-with-index' : ''}`}>
            <input
                type="input"
                className='legend-input tw-w-full'
                value={legend}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setLegend(event.target.value)}
                placeholder={tr('menu.legend.placeholder')}
                maxLength={50}
                disabled={props.disabled}
            />
        </div>
    );
}
