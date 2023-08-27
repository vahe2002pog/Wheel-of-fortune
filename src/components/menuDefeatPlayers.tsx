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
    const focusDefeatPlayer = useCallback((item: IPlayer) => focusNext('defeatPlayers', item), []);

    const { setPlayers, defeatPlayers, setDefeatPlayers } = useContext(PlayersContext);
    const { playersIndexVisible } = useContext(SettingsContext);

    const onClear = useCallback(() => setDefeatPlayers([]), [setDefeatPlayers]);

    const onRemove = useCallback((player: IPlayer) => {
        setDefeatPlayers((items) => items.filter(({id}) => id !== player.id));
    }, [setDefeatPlayers]);

    const onChange = useCallback((player: IPlayer) => {
        setDefeatPlayers((items) => replaceEdited(items, player));
    }, [setDefeatPlayers]);

    const onItemsChange = useCallback((players: IPlayer[]) => {
        setDefeatPlayers((items) => players);
    }, [setDefeatPlayers]);

    const onBack = useCallback((player?: IPlayer) => {
        if (player) {
            setDefeatPlayers((items) => items.filter(({id}) => id !== player.id));
            setPlayers((items) => [player, ...items].sort(sortById));
        } else {
            setDefeatPlayers((defeatPlayers) => {
                setPlayers((players) => {
                    return [...defeatPlayers, ...players].sort(sortById);
                });
                return [];
            });
        }
    }, [setPlayers, setDefeatPlayers]);

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
        defeatPlayers.length ? <>
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
                id='defeatPlayers'
                items={defeatPlayers}
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
