export function debounce<T extends Function>(func: T, wait: number): T {
    let timeout = 0;
    const callable = (...args: any) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, wait) as unknown as number;
    };

    return <T>(<any>callable);
}
