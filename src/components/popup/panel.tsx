import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/panel.css';
import closeIcon from '../../img/close.svg';
import { useTranslation } from 'react-i18next';
import Icon from '../icon';

interface IProps {
    children: any;
    onClose: () => void;
    caption: string;
}

const Panel = ({ children, onClose, caption }: IProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    const close = useCallback(() => {
        setIsOpen(!isOpen);
        setTimeout(() => onClose(), 300);
    }, [isOpen, onClose]);

    useEffect(() => {
        setTimeout(() => setIsOpen(true), 50);
    }, []);

    return (
        <div>
            <div className='panel-overlay' onClick={close}></div>
            <div className={`panel ${ isOpen ? 'open' : '' }`}>
                <div className='header'>
                    <div>{ caption }</div>
                    <Icon src={closeIcon} onClick={close} alt={t('panel.close')} />
                </div>
                <div className='content scroll'>
                    { children }
                </div>
            </div>
            
        </div>
    );
};

export default Panel;
