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

const SPINNER_TIME = 10;

export default function Spinner(props: IProps) {

    const {spinnerRunning, runSpinner: onRunSpinner, items } = props;
    const displayItems = useMemo(() => items.filter(({text}) => text), [items]);
    const requestRef = React.useRef(0 as unknown as ReturnType<typeof setTimeout>);
    const rotateRef = React.useRef(getAngelRunner());
    const [angle, setAngle] = useState(180);

    const animate = () => {
        setAngle((val) => rotateRef.current.next(val));

        if (!rotateRef.current.ended) {
            requestRef.current = setTimeout(animate, SPINNER_TIME);
        } else {
            clearTimeout(requestRef.current);
        }
    }

    useEffect(() => {
        if (spinnerRunning) {
            rotateRef.current = getAngelRunner();
            requestRef.current = setTimeout(animate, SPINNER_TIME);
        }
        return () => clearTimeout(requestRef.current);
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
