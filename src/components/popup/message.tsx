import { useEffect, useState } from 'react';
import '../../styles/message.css';
import { IPopupProps } from './interfaces';

interface IProps extends IPopupProps {
    message?: string;
}

const Message = ({ message, onClose, caption, style, className }: IProps) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsOpen(true), 50);
        setTimeout(() => {
            setIsOpen(false);
            setTimeout(() => onClose(), 300);
        }, 3000);
    }, []);

    return (
        <div className={`message ${ isOpen ? 'open' : '' } ${className || ''}`} style={style} >
            { message }
        </div>
    );
};

export default Message;
