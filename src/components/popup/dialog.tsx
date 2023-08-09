import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/dialog.css';
import closeIcon from '../../img/close.svg';
import { useTranslation } from 'react-i18next';
import Icon from '../icon';

interface IProps {
    children: any;
    onClose: () => void;
    caption: string;
}

export default function Dialog({ children, onClose, caption }: IProps) {
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
            <div className='dialog-overlay' onClick={close}></div>
            <div className={`dialog ${ isOpen ? 'open' : '' }`}>
                <div className='header'>
                    <div>{ caption }</div>
                    <Icon src={closeIcon} onClick={close} alt={t('dialog.close')} />
                </div>
                <div className='content scroll'>
                    { children }
                </div>
            </div>
            
        </div>
    );
};
