export function getWinnerIndex(value: number, playerCount: number): number {
    let angle = value + 90 - (Math.floor((value + 90) / 360) * 360);
    return playerCount - Math.floor(angle / (360 / playerCount)) - 1;
}
