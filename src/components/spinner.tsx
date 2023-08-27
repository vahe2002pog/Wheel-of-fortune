import React, {useCallback, useEffect, useMemo, useContext}  from 'react';
import SpinnerFrontSvg from './spinnerFrontSvg';
import SpinnerBackSvg from './spinnerBackSvg';
import { getWinnerIndex } from '../helpers/winnerCalc';
import { AnimationState, useAngleAnimation } from '../hook/useAngleAnimation';
import { DEFAULT_SPINNER_ITEMS } from '../helpers/constants';
import { SettingsContext } from '../context/SettingsContext';

interface IProps {
    items: IPlayer[];
    setDisabled?: (disabled: boolean) => void;
    stopSpinner?: (winner: IPlayer) => void;
}

export default function Spinner(props: IProps) {

    const {setDisabled, items } = props;
    const { newEditor } = useContext(SettingsContext);
    const [angle, run, animationState] = useAngleAnimation(items.length ? 0 : 90);
    const displayItems = useMemo(() => {
        let res = items.filter(({text}) => text.trim());
        if (newEditor) {
            res = res.map((item, i) => {
                const s = res.length % 3 === 1 ? (res.length - 1 === i ? 1 : 0): 0;
                const index = (i + s) % 3;
                return {
                    ...item,
                    color: index === 0 ? '#111' : index === 1 ? '#333' : '#222'
                }
            });
        }
        return res.length ? res : DEFAULT_SPINNER_ITEMS
    }, [items, newEditor]);

    const [winnerName, winnerIndex] = useMemo(() => {
        const index = getWinnerIndex(angle, displayItems.length);
        return [displayItems[index]?.text, index];
    }, [angle, displayItems]);


    useEffect(() => {
        if (animationState === AnimationState.ended) {
            if (DEFAULT_SPINNER_ITEMS !== displayItems) {
                props.stopSpinner?.(displayItems[winnerIndex]);
            }
            setDisabled?.(false);
        }
    }, [animationState, setDisabled]);

    const runSpinner = useCallback(() => {
        if (displayItems.length > 1) {
            run();
            setDisabled?.(true);
        }
    }, [displayItems, setDisabled, run]);

    return (
        <div className="spinner tw-flex tw-flex-col tw-h-full tw-w-full tw-flex-2">
            <div className="winner-field tw-truncate tw-w-full tw-flex-shrink-0">
                {winnerName}
            </div>
            <div className="spinner-wrapper tw-relative tw-flex-1 tw-overflow-hidden" style={{'--spinner-angle': `${angle}deg`} as React.CSSProperties}>
                <SpinnerBackSvg className="spinner-back tw-absolute tw-h-full tw-w-full" items={displayItems} />
                <SpinnerFrontSvg className="spinner-front tw-absolute tw-h-full tw-w-full" runSpinner={runSpinner} />
            </div>
        </div>
    );
}
