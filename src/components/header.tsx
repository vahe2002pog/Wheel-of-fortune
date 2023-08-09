import React from 'react';
import copyIcon from '../img/copy.svg';
import pasteIcon from '../img/paste.svg';
// import settingIcon from '../img/setting.svg';
// import infoIcon from '../img/info.svg';
import logo from '../img/logo.svg';
import { useTranslation } from 'react-i18next';
import Noindex from './noindex';
import { TSetOpen } from '../hook/useOpener';
import Icon from './icon';

interface IProps {
    onCopy: () => void;
    onPaste: () => void;
    setOpen: TSetOpen;
}

export default function Header(props: IProps) {
    const { t } = useTranslation();
    return (
        <header className="tw-flex">
            <img src={logo} alt={ t('header.title.logo') } height='30px' />
            <Noindex>
                <div className="links-wrapper">
                    {/* <Icon src={infoIcon} onClick={() => props.setOpen('info', 'panel')} alt={t('header.title.info')} />
                    <Icon src={settingIcon} onClick={() => props.setOpen('setting', 'panel')} alt={t('header.title.setting')} /> */}
                    <Icon src={pasteIcon} onClick={() => props.onPaste()} alt={t('header.paste')} />
                    <Icon src={copyIcon} onClick={props.onCopy} alt={t('header.copy')} />
                </div>
            </Noindex>
        </header>
    );
}
