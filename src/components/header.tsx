import React from 'react';
import copyIcon from '../img/copy.svg';
import pasteIcon from '../img/paste.svg';
import { useTranslation } from 'react-i18next';

interface IProps {
    onCopy: () => void;
    onPaste: () => void;
}

export default function Header(props: IProps) {

    const { t } = useTranslation();
    return (
        <header className="tw-flex">
            <span>{t('header.title')}</span>
            <div className="links-wrapper">
                <img src={pasteIcon} onClick={() => props.onPaste()} className="svg-icon tw-cursor-pointer" alt="paste icon" width="24px" height="24px" title={t('header.paste')} />
                <img src={copyIcon} onClick={props.onCopy} className="svg-icon tw-cursor-pointer" alt="copy icon" width="24px" height="24px" title={t('header.copy')} />
            </div>
        </header>
    );
}
