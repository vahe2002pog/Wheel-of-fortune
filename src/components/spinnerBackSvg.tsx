import React, {useMemo, memo} from "react";
const textMaxLength = 19;

function Text({cx, cy, r, start, end, text}: {cx: number, cy: number, r: number, start: number, end: number, text: string}) {

    const props = useMemo(() => {
        const angle = (start + (end - start) / 2) * 180 / Math.PI;
        const transform = `rotate(${angle} ${cx} ${cy})`;
        return { x: cx + 25, y: cy + 4, fontSize: '6px', fontFamily: 'MonospaceBold', transform };
    }, [cx, cy, start, end]);

    const displayText = useMemo(() => {
        return `${text.slice(0, textMaxLength)}${text.length > textMaxLength ? '...' : ''}`;
    }, [text]);

    return (
        <>
            <text {...props} stroke="#fff" strokeWidth="3" >{displayText}</text>
            <text {...props}>{displayText}</text>
        </>
    );
}

function calcPint(cx: number, cy: number, r: number, angle: number) {
    const ax = Math.cos(angle) * r + cx;
    const ay = Math.sin(angle) * r + cy;
    return `${ax}, ${ay}`;
}

function getPoints(cx: number, cy: number, r: number, start: number, end: number) {
    const step = 0.15;
    const len = Math.round((end - start) / step);
    return Array(len).fill(null).map((_, index) => {
        return calcPint(cx, cy, r,start + step * index);
    }).join(' ') + ' ' + calcPint(cx, cy, r, end);
}

interface IProps {
    items: IPlayer[];
    className?: string;
    style?: object;
}

export default memo(function SpinnerBackSvg({items, className, style}: IProps) {

    const displayItems = useMemo(() => items.filter(({text}) => text), [items]);

    const angle = Math.PI * 2 / displayItems.length || 1;

    return (
        <svg className={className} viewBox="0 0 240 240" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ userSelect: 'none', ...(style || {}) }}>
            {
                displayItems.map((item, index) => {
                    const points = getPoints(120, 120, 110, index * angle, (index + 1) * angle );
                    return (
                        <g key={item.id}>
                            <polygon points={`120,120 ${points}`} style={{ fill: item.color, stroke: '#3a3a3a', strokeWidth: '1' }} />
                            <Text cx={120} cy={120} r={110} start={index * angle} end={(index + 1) * angle} text={item.text} />
                        </g>
                    );
                })
            }
            <circle fill="#0000" cx="120" cy="120" r="110" stroke="#3a3a3a" strokeWidth="2"/>
        </svg>
    );
});
