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

export function replaceEdited(items: IPlayer[], player: IPlayer) {
    const newItems = [...items];
    const index = items.findIndex(({id}) => id === player.id);
    if (index === -1) {
        newItems.push(player);
    } else {
        newItems[index] = player;
    }
    return newItems;
}

export function focusNext(items: IPlayer[], item: IPlayer): void {
    const index = items.findIndex(({id}) => id === item.id);
    if (index !== -1 && index + 1 < items.length) {
        const id = `#input-${items[index + 1].id}`;
        const input = document.querySelector(id) as HTMLInputElement;
        input?.focus();
    }
}
