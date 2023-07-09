function * randomGenerator(previous: number = 0, max: number) {
    while (true) {
        previous = previous * 16807 % 2147483647
        yield previous % max;
    }
}

const r = randomGenerator(1, 16);

function random(): number {
    return r.next().value as number;
}

export function getRandomColor(): string {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(random())];
    }
    return color;
}
