import React, {useCallback, useEffect, useMemo, useState}  from "react";
import SpinnerFrontSvg from "./spinnerFrontSvg";
import SpinnerBackSvg from "./spinnerBackSvg";
import { getAngelRunner } from "../helpers/angelRunner";
import { getWinnerIndex } from "../helpers/winnerCalc";

interface IProps {
    spinnerRunning: boolean;
    items: IPlayer[];
    runSpinner?: () => void;
    stopSpinner?: (winner: IPlayer) => void;
}

export default function Spinner(props: IProps) {

    const {spinnerRunning, runSpinner: onRunSpinner, items } = props;
    const [angle, setAngle] = useState(0);
    const displayItems = useMemo(() => items.filter(({text}) => text), [items]);
    const requestRef = React.useRef(0);
    const rotateRef = React.useRef(getAngelRunner(angle));

    const animate = (timeStamp: number) => {
        setAngle((val) => rotateRef.current.next(timeStamp));

        if (!rotateRef.current.ended) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(requestRef.current);
        }
    }

    useEffect(() => {
        if (spinnerRunning) {
            rotateRef.current = getAngelRunner(angle);
            requestRef.current = requestAnimationFrame(animate);
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [spinnerRunning]);

    useEffect(() => {
        if (requestRef.current && rotateRef.current.ended) {
            const index = getWinnerIndex(angle, displayItems.length);
            const winner = displayItems[index];
            props.stopSpinner?.(winner);
        }
    }, [rotateRef.current, rotateRef.current.ended]);

    const runSpinner = useCallback(() => {
        if (displayItems.length > 1) {
            onRunSpinner?.();
        }
    }, [displayItems, onRunSpinner]);

    const winnerName = useMemo(() => {
        const index = getWinnerIndex(angle, displayItems.length);
        return displayItems[index]?.text;
    }, [angle, displayItems]);


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
