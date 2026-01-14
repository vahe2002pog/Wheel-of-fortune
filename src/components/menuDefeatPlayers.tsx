import React, { useMemo, useCallback, useContext } from 'react';
import List from './list';
import rmIcon from '../img/rm.svg';
import arrowUpIcon from '../img/arrow-up.svg';
import { focusNext, replaceEdited, sortById } from '../helpers/player';
import { useTranslation } from '../hook/useTranslation';
import Icon from './icon';
import { Text } from './text';
import { PlayersContext } from '../context/PlayersContext';
import { SettingsContext } from '../context/SettingsContext';

interface IProps {
    disabled: boolean;
}

export default function MenuDefeatPlayers(props: IProps) {
    const { tr } = useTranslation();
    const focusDefeatPlayer = useCallback((item: IPlayer) => focusNext('outPlayers', item), []);

    const { setPlayers, outPlayers, setOutPlayers } = useContext(PlayersContext);
    const { playersIndexVisible } = useContext(SettingsContext);

    const onClear = useCallback(() => setOutPlayers([]), [setOutPlayers]);

    const onRemove = useCallback((player: IPlayer) => {
        setOutPlayers((items) => items.filter(({id}) => id !== player.id));
    }, [setOutPlayers]);

    const onChange = useCallback((player: IPlayer) => {
        setOutPlayers((items) => replaceEdited(items, player));
    }, [setOutPlayers]);

    const onItemsChange = useCallback((players: IPlayer[]) => {
        setOutPlayers((items) => players);
    }, [setOutPlayers]);

    const onBack = useCallback((player?: IPlayer) => {
        if (player) {
            setOutPlayers((items) => items.filter(({id}) => id !== player.id));
            setPlayers((items) => [player, ...items].sort(sortById));
        } else {
            setOutPlayers((outPlayers) => {
                setPlayers((players) => {
                    return [...outPlayers, ...players].sort(sortById);
                });
                return [];
            });
        }
    }, [setPlayers, setOutPlayers]);

    const defeatPlayersActions = useMemo((): IAction[] => {
        return [{
            id: 'back',
            title: tr('menu.back'),
            icon: arrowUpIcon,
            handler: onBack
        }, {
            id: 'remove',
            title: tr('menu.remove'),
            icon: rmIcon,
            handler: onRemove
        }]
    }, [tr, onRemove, onBack]);

    return (
        outPlayers.length ? <>
            <div className='menu-caption tw-flex tw-justify-between tw-items-baseline'>
                <h3>{tr('menu.defeat-players')}</h3>
                <div className='tw-flex'>
                    <Icon
                        src={arrowUpIcon}
                        className='menu-back-button'
                        alt={tr('menu.backAll')}
                        size='16px'
                        disabled={props.disabled}
                        onClick={() => onBack()}
                    />
                    <Text text={tr('menu.clear')} onClick={onClear} disabled={props.disabled} />
                </div>
            </div>
            <List
                id='outPlayers'
                items={outPlayers}
                disabled={props.disabled}
                onItemChange={onChange}
                onItemsChange={onItemsChange}
                indexVisible={playersIndexVisible}
                actions={defeatPlayersActions}
                onComplete={focusDefeatPlayer}
            />
        </> : <></>
    );
}
