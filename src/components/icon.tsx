interface IProps {
    src: string;
    onClick: () => void;
    alt: string;
    size?: string;
}

export default function Icon({src, alt, onClick, size = '24px'}: IProps) {
    return (
        <img src={src} onClick={onClick} className='svg-icon tw-cursor-pointer' alt={alt} width={size} height={size} title={alt} />
    );
}
