interface IProps {
    src: string;
    onClick: () => void;
    alt: string;
    size?: string;
    className?: string;
    disabled?: boolean;
}

export default function Icon({src, alt, onClick, size = '24px', className, disabled}: IProps) {
    return (
        <img
            src={src} onClick={disabled ? () => {} : onClick}
            className={`svg-icon ${disabled ? 'svg-icon-disabled' : 'tw-cursor-pointer' } ${className || ''}`}
            alt={alt}
            width={size}
            height={size}
            title={alt}
        />
    );
}
