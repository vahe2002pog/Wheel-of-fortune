import { getRandomColor } from "./randomColor";

const getId = (() => {
    let index = 0;
    return () => String(index++);
})();

export function createPlayer(ext?: Partial<IPlayer>): IPlayer {
    return {
        id: ext?.id || getId(),
        color: ext?.color || getRandomColor(),
        text: ext?.text || ''
    };
}

export function isPlayerEmpty(player: IPlayer): boolean {
    return !!player?.text;
}

