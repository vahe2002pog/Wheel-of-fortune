import React from 'react';
import copyIcon from '../img/copy.svg';
import pasteIcon from '../img/paste.svg';
import logo from '../img/logo.svg';
import { useTranslation } from 'react-i18next';
import Noindex from './noindex';

interface IProps {
    onCopy: () => void;
    onPaste: () => void;
}

export default function Header(props: IProps) {

    const { t } = useTranslation();
    return (
        <header className="tw-flex">
            <img src={logo} alt={ t('header.title') } height='30px' />
            <Noindex>
                <div className="links-wrapper">
                    <img src={pasteIcon} onClick={() => props.onPaste()} className="svg-icon tw-cursor-pointer" alt={t('header.paste')} width="24px" height="24px" title={t('header.paste')} />
                    <img src={copyIcon} onClick={props.onCopy} className="svg-icon tw-cursor-pointer" alt={t('header.copy')} width="24px" height="24px" title={t('header.copy')} />
                </div>
            </Noindex>
        </header>
    );
}
