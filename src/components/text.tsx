export const Text = ({text, onClick, disabled }: { text: string, onClick?: () => void, disabled?: boolean }) => {
    return (
        <div onClick={disabled ? () => {} : onClick } className={`noselect ${ disabled ? 'text-disabled' : 'tw-cursor-pointer'}`}>
            {text}
        </div>
    );
}
