const accelerationPoint = 31;
const slowdownPoint = 70;
const accelerationMax = acceleration(accelerationPoint - 1);
const slowdownMax = slowdown(slowdownPoint);

function acceleration(val: number): number {
    if (val < 0 ) {
        return 0
    }
    const x = val / 100;
    return x*x*8;
}

function slowdown(val: number): number {
    const x = val - accelerationPoint + 2;
    return (x > 0.02 ? (Math.log(x)) / 14: 0) + accelerationMax;
}

function stopping(val: number): number {
    const x = (val - slowdownPoint) / (100 - slowdownPoint);
    return slowdownMax + (1 - slowdownMax) * x;
}

function getPercent(val: number): number {
    let res = 0;
    if (val < accelerationPoint) {
        res = acceleration(val);
    } else if (val < slowdownPoint) {
        res = slowdown(val);
    } else {
        res = stopping(val);
    }

    if (res > 1) {
        console.error('percent > 1');
    } else if (res < 0) {
        console.error('percent < 0');
    }
    return res;
}

export function getAngelRunner(startAngle: number) {
    const endAngle = 360 * 2 + Math.floor(Math.random() * 360);
    const time = 9000;
    const start = performance.now();
    return {
        ended: false,
        next(timeStamp: number): number {
            if (this.ended) {
                console.error('Timer should be cleaned');
                return (endAngle + startAngle) % 360;
            }

            let delta = timeStamp - start;
            const percent = delta ? (delta / time) * 100 : 0;

            if (percent >= 100) {
                this.ended = true;
                console.info(`Spinning time: ${Math.floor(performance.now() - start)}ms`)
                return (endAngle + startAngle) % 360;
            }
            const p = getPercent(percent)
            const res = p * endAngle + startAngle;
            // console.log(percent, p, res);
            return res;
        }
    };
}
