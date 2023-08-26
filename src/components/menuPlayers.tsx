import React, { useMemo, useCallback, useContext } from 'react';
import List from './list';
import rmIcon from '../img/rm.svg';
import { createPlayer, focusNext, replaceEdited } from '../helpers/player';
import { useTranslation } from '../hook/useTranslation';
import { useClipboard } from '../hook/useClipboard';
import { Text } from './text';
import { PlayersContext } from '../context/PlayersContext';
import { SettingsContext } from '../context/SettingsContext';

interface IProps {
    disabled: boolean;
}

export default function MenuPlayers({disabled}: IProps) {

    const { players, setPlayers } = useContext(PlayersContext);
    const { playersIndexVisible } = useContext(SettingsContext);

    const onClear = useCallback(() => setPlayers([]), [setPlayers]);

    const onChange = useCallback((player: IPlayer) => {
        setPlayers((items) => replaceEdited(items, player));
    }, [setPlayers]);

    const onRemove = useCallback((player: IPlayer) => {
        setPlayers((items) => items.filter(({id}) => id !== player.id));
    }, [setPlayers]);

    const { paste } = useClipboard();
    const { tr } = useTranslation();

    const focusPlayer = useCallback((item: IPlayer) => focusNext('players', item), []);

    const playersActions = useMemo((): IAction[] => {
        return [{
            id: 'remove',
            title: tr('menu.remove'),
            icon: rmIcon,
            handler: onRemove
        }]
    }, [tr, onRemove]);

    const playersWithAdditionalInput = useMemo(() => {
        const items = [...players];
        if (!items[items.length - 1] || items[items.length - 1].text) {
            items.push(createPlayer());
        }
        return items;
    }, [players]);

    return (
        <>
            <div className='menu-caption tw-flex tw-justify-between tw-items-baseline'>
                <h2>{tr('menu.players')}</h2>
                {
                    players.length ? <Text onClick={onClear} text={tr('menu.clear')} disabled={disabled} /> : null
                }
            </div>

            <List
                id='players'
                items={playersWithAdditionalInput}
                disabled={disabled}
                onItemChange={onChange}
                hideLastAction={true}
                actions={playersActions}
                indexVisible={playersIndexVisible}
                onComplete={focusPlayer}
                onPaste={paste}
            />
        </>
    );
}
