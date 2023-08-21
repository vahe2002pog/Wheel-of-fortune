import { useCallback, useContext, useRef, useState } from 'react';
import { SettingsContext } from '../context/SettingsContext';
export enum AnimationState {
    running = 'r',
    ended = 'e',
    unset = 'u'
}

export function useAngleAnimation(initAngle: number): [number, () => void, AnimationState] {
    const [currentAngle, setCurrentAngle] = useState(initAngle);
    const requestRef = useRef(0);
    const { rotationTime } = useContext(SettingsContext);
    const stateRef = useRef({ startAngle: initAngle, endAngle: 0, startTime: 0, state: AnimationState.unset, currentAngle: initAngle });

    const rotate = useCallback((previousTime: number) => {

        if (stateRef.current.state === AnimationState.ended) {
            console.error('Timer should be cleaned');
            return;
        }

        if (stateRef.current.startTime === 0) {
            stateRef.current.startTime = previousTime;
        }

        const elapsedTime = previousTime - stateRef.current.startTime;

        if (elapsedTime >= rotationTime) {
            stateRef.current.currentAngle = stateRef.current.endAngle % 360;
            stateRef.current.state = AnimationState.ended;
        } else {
            const progress = elapsedTime / rotationTime;
            const angleDifference = stateRef.current.endAngle - stateRef.current.startAngle;
            const easingProgress = Math.pow(Math.sin(Math.PI*(progress + 7)/2),7)+1;
            stateRef.current.currentAngle = stateRef.current.startAngle + angleDifference * easingProgress;
        }

        setCurrentAngle((() => stateRef.current.currentAngle));

        if (stateRef.current.state === AnimationState.running) {
            requestRef.current = requestAnimationFrame(rotate);
        } else {
            cancelAnimationFrame(requestRef.current);
        }
    }, [rotationTime]);

    const run = useCallback(() => {
        if (stateRef.current.state === AnimationState.running) {
            console.warn('Spinner already running');
        } else {
            stateRef.current.endAngle = 360 * (Math.floor(rotationTime / 1000) + 2) + Math.floor(Math.random() * 360);
            stateRef.current.startAngle = stateRef.current.currentAngle;
            stateRef.current.state = AnimationState.running;
            stateRef.current.startTime = 0;
            requestRef.current = requestAnimationFrame(rotate);
        }
    }, [rotate]);

    return [currentAngle, run, stateRef.current.state];
}