import React, {useCallback, useEffect, useMemo}  from 'react';
import SpinnerFrontSvg from './spinnerFrontSvg';
import SpinnerBackSvg from './spinnerBackSvg';
import { getWinnerIndex } from '../helpers/winnerCalc';
import { AnimationState, useAngleAnimation } from '../hook/useAngleAnimation';

interface IProps {
    items: IPlayer[];
    setDisabled?: (disabled: boolean) => void;
    stopSpinner?: (winner: IPlayer) => void;
}

export default function Spinner(props: IProps) {

    const {setDisabled, items } = props;
    const [angle, run, animationState] = useAngleAnimation(0);
    const displayItems = useMemo(() => items.filter(({text}) => text), [items]);

    const [winnerName, winnerIndex] = useMemo(() => {
        const index = getWinnerIndex(angle, displayItems.length);
        return [displayItems[index]?.text, index];
    }, [angle, displayItems]);


    useEffect(() => {
        if (animationState === AnimationState.ended) {
            props.stopSpinner?.(displayItems[winnerIndex]);
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
