export function getWinnerIndex(value: number, playerCount: number): number {
    const angle = 360 - (value + 90) % 360;
    return Math.floor(angle * playerCount / 360) % playerCount;
}
