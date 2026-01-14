import React, { useContext } from 'react';
import copyIcon from '../img/copy.svg';
import pasteIcon from '../img/paste.svg';
import settingIcon from '../img/setting.svg';
import listIcon from '../img/list.svg';
import logo from '../img/logo.svg';
import { useTranslation } from '../hook/useTranslation';
import Noindex from './noindex';
import Icon from './icon';
import { PopupContext } from '../context/popupContext';
import { useClipboard } from '../hook/useClipboard';
import { SettingsContext } from '../context/SettingsContext';

interface IProps {
    disabled?: boolean;
}

export default function Header({disabled}: IProps) {
    const { tr } = useTranslation();
    const { openPopup } = useContext(PopupContext);
    const { newEditor } = useContext(SettingsContext);
    const { copy, paste } = useClipboard();
    return (
        <header className="tw-flex">
            <img src={logo} alt={ tr('header.title.logo') } height='30'/>
            <Noindex>
                <div className="links-wrapper">
                    <Icon src={listIcon} disabled={disabled} onClick={() => openPopup({ componentId: 'list', popupId: 'panel'})} alt={tr('header.title.list')} />
                    <Icon src={settingIcon} disabled={disabled} onClick={() => openPopup({ componentId: 'setting', popupId: 'panel'})} alt={tr('header.title.setting')} />
                    { newEditor || <Icon src={pasteIcon} disabled={disabled} onClick={paste} alt={tr('header.paste')} /> }
                    <Icon src={copyIcon} disabled={disabled} onClick={copy} alt={tr('header.copy')} />
                </div>
            </Noindex>
        </header>
    );
}
