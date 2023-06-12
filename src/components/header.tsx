import React from "react";
import copyIcon from '../img/copy.svg';
import pasteIcon from '../img/paste.svg';

export default function Header() {
    return (
        <header className="tw-flex">
            <span>Фортуна</span>
            <div className="links-wrapper">
                <img src={pasteIcon} className="svg-icon tw-cursor-pointer" alt="paste icon" width="24px" height="24px" title="Вставить текст из буфера" />
                <img src={copyIcon} className="svg-icon tw-cursor-pointer" alt="copy icon" width="24px" height="24px" title="Скопировать ссылку" />
            </div>
        </header>
    );
}