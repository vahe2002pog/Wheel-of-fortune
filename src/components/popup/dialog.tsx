import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/dialog.css';
import closeIcon from '../../img/close.svg';
import { useTranslation } from '../../hook/useTranslation';
import Icon from '../icon';
import { IPopupProps } from './interfaces';

interface IProps extends IPopupProps {

}

export default function Dialog({ children, onClose, caption, style, className }: IProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { tr } = useTranslation();

    const close = useCallback(() => {
        setIsOpen(!isOpen);
        setTimeout(() => onClose(), 300);
    }, [isOpen, onClose]);

    useEffect(() => {
        setTimeout(() => setIsOpen(true), 50);
    }, []);

    return (
        <div className={ className }>
            <div className='dialog-overlay' onClick={close}></div>
            <div className={`dialog ${ isOpen ? 'open' : '' }`} style={style}>
                <div className='header'>
                    <div>{ caption }</div>
                    <Icon src={closeIcon} onClick={close} alt={tr('panel.close')} />
                </div>
                <div className='content scroll'>
                    { children }
                </div>
            </div>
        </div>
    );
};
