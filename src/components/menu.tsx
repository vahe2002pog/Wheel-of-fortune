import { useContext } from 'react';
import Defeat from './defeat';
import MenuPlayers from './menuPlayers';
import MenuDefeatPlayers from './menuDefeatPlayers';
import { PlayersContext } from '../context/PlayersContext';

interface IProps {
    disabled: boolean;
}

export default function Menu({disabled}: IProps) {
    const { defeatMode, setDefeatMode } = useContext(PlayersContext);
    return (
        <div className="menu tw-flex-1 tw-overflow-y-scroll">
            <div className="menu-content-center">
                <Defeat defeatMode={defeatMode} disabled={disabled} onChange={setDefeatMode} />
                <MenuPlayers disabled={disabled} />
                <MenuDefeatPlayers disabled={disabled} />
            </div>
        </div>
    );
}
