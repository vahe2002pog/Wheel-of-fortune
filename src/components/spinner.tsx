import React, {useCallback, useMemo, useState}  from "react";
import SpinnerFrontSvg from "./spinnerFrontSvg";
import SpinnerBackSvg from "./spinnerBackSvg";
import { getAngelRunner } from "../helpers/angelRunner";
import { getWinnerIndex } from "../helpers/winnerCalc";

interface IProps {
    spinnerRunning: boolean;
    items: IPlayer[];
    runSpinner?: () => void;
    stopSpinner?: () => void;
}

export default function Spinner(props: IProps) {

    const {spinnerRunning, runSpinner: onRunSpinner, items } = props;

    const [angle, setAngle] = useState(0);

    const rotate = useCallback(getAngelRunner(), [spinnerRunning]);

    if (spinnerRunning) {
        requestAnimationFrame((timeStamp) => {
            setAngle((val) => {
                const {ended, angle} = rotate(val);
                if (ended) {
                    props.stopSpinner?.();
                }
                return angle;
            });
        });
    }

    const displayItems = useMemo(() => items.filter(({text}) => text), [items]);

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
