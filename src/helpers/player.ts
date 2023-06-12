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
    let hasChange = false;
    const newItems = [...items];
    const index = items.findIndex(({id}) => id === player.id);
    if (index === -1) {
        newItems.push(player);
        hasChange = true;
    } else {
        hasChange = newItems[index].text !== player.text;
        if (hasChange) {
            newItems[index] = player;
        }
    }
    return hasChange ? newItems : items;
}

export function focusNext(itemsContainer: string, item: IPlayer): void {
    setTimeout(() => {
        const items = document.querySelectorAll(`#${itemsContainer} input`) || [];
        const index = [...items as unknown as Array<HTMLInputElement>].findIndex(({id}) => id === `input-${item.id}`);
        if (index !== -1 && index + 1 < items.length) {
            const input = items[index + 1] as HTMLInputElement;
            input?.focus();
        }
    }, 20);
}
