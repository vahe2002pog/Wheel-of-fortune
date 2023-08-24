import React, { memo } from "react";
interface IProps {
    className?: string;
    runSpinner?: () => void;
}

export default memo(function SpinnerFrontSvg({className, runSpinner}: IProps) {
    return (
        <svg className={className} viewBox="0 0 240 240" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{userSelect: 'none'}}>
            <circle fill="#0000" cx="120" cy="120" r="110" stroke="#3a3a3a" strokeWidth="1"/>
            <g onClick={runSpinner} cursor="pointer">
                <circle fill="orange" cx="120" cy="120" r="20" stroke="#3a3a3a" strokeWidth="1"/>
                <text x="103" y="124" stroke="#fff" strokeWidth="3" fontSize="16px" fontFamily="Comic Sans MS">Spin</text>
                <text x="103" y="124" fontSize="16px" fontFamily="Comic Sans MS">Spin</text>
            </g>
            <polygon points="115,0 125,0 120,14" style={{ fill: 'orange', stroke: '#3a3a3a', strokeWidth: '1' }} />
        </svg>
    );
});
