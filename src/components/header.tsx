import React, { useContext } from 'react';
import copyIcon from '../img/copy.svg';
import pasteIcon from '../img/paste.svg';
// import settingIcon from '../img/setting.svg';
// import infoIcon from '../img/info.svg';
import logo from '../img/logo.svg';
import { useTranslation } from 'react-i18next';
import Noindex from './noindex';
import Icon from './icon';
import { PopupContext } from '../context/popupContext';
import { useClipboard } from '../hook/useClipboard';

interface IProps {
}

export default function Header(props: IProps) {
    const { t } = useTranslation();
    const { openPopup } = useContext(PopupContext);
    const { copy, paste } = useClipboard();
    return (
        <header className="tw-flex">
            <img src={logo} alt={ t('header.title.logo') } height='30px' width="auto" />
            <Noindex>
                <div className="links-wrapper">
                    {/* <Icon src={infoIcon} onClick={() => openPopup({ componentId: 'info', popupId: 'panel'})} alt={t('header.title.info')} />
                    <Icon src={settingIcon} onClick={() => openPopup({ componentId: 'setting', popupId: 'panel'})} alt={t('header.title.setting')} /> */}
                    <Icon src={pasteIcon} onClick={paste} alt={t('header.paste')} />
                    <Icon src={copyIcon} onClick={copy} alt={t('header.copy')} />
                </div>
            </Noindex>
        </header>
    );
}
