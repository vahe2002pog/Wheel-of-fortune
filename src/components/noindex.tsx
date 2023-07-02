import React, { useRef, useEffect } from "react";

interface IProps {
    children: JSX.Element|JSX.Element[];
}

const HtmlComment = React.memo(({text}: {text: string}) => {
    const ref = useRef(null as never as HTMLDivElement);
    useEffect(() => {
        if (ref.current) {
            ref.current.outerHTML = `<!--${text}-->`;
            ref.current = null as never as HTMLDivElement;
        }
    }, [text]);
    return (<div ref={ref} />);
});

export default function Noindex(props: IProps) {
    return (
        <>
            <HtmlComment text="noindex"/>
            {
                props.children
            }
            <HtmlComment text="/noindex"/>
        </>
    );
}
