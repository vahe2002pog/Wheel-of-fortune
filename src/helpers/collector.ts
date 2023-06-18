export function collector<T extends Function>(func: T, wait: number): T {
    let timeout = 0;
    let p = {};
    const callable = (args: object) => {
        clearTimeout(timeout);
        p = {...p, ...args};
        timeout = setTimeout(() => {
            func(p);
            p = {};
        }, wait) as unknown as number;
    };

    return <T>(<any>callable);
}
