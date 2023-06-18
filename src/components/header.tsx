import React from "react";
import copyIcon from '../img/copy.svg';
import pasteIcon from '../img/paste.svg';

interface IProps {
    onCopy: () => void;
    onPaste: () => void;
}

export default function Header(props: IProps) {
    return (
        <header className="tw-flex">
            <span>Фортуна</span>
            <div className="links-wrapper">
                <img src={pasteIcon} onClick={() => props.onPaste()} className="svg-icon tw-cursor-pointer" alt="paste icon" width="24px" height="24px" title="Вставить текст из буфера" />
                <img src={copyIcon} onClick={props.onCopy} className="svg-icon tw-cursor-pointer" alt="copy icon" width="24px" height="24px" title="Скопировать ссылку" />
            </div>
        </header>
    );
}
