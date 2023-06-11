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

    const runSpinner = useCallback(() => {
        if (items.length > 1) {
            onRunSpinner?.();
        }
    }, [items, onRunSpinner]);

    const winnerName = useMemo(() => {
        const index = getWinnerIndex(angle, items.length);
        return items[index]?.text;
    }, [angle, items]);

    return (
        <div className="spinner tw-flex tw-flex-col tw-h-full tw-w-full">
            <div className="winder-field tw-truncate tw-w-full">
                {winnerName}
            </div>
            <div className="tw-relative">
                <div style={{transform: `rotate(${angle}deg)`}}>
                    <SpinnerBackSvg className="spinner-back" items={items} />
                </div>
                <SpinnerFrontSvg className="spinner-front tw-absolute tw-h-full tw-w-full" runSpinner={runSpinner} />
            </div>
        </div>
    );
}
