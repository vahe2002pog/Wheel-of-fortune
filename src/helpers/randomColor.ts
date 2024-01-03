function * randomGenerator(previous: number = 0) {
    while (true) {
        previous = previous * 16807 % 2147483647
        yield previous;
    }
}

let r = randomGenerator(2);

function random(min: number, max: number): number {
    const val: number = r.next().value as number;
    return Math.round(val % max ) + min;
}

export function resetRandomize() {
    r = randomGenerator(2);
}

export function getRandomColor(): string {
    return `hsl(${random(0, 359)}deg ${random(40, 100)}% ${random(20, 50)}%)`;
}
