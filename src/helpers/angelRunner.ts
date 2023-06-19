export function getAngelRunner() {
    const randNumber = Math.floor(Math.random() * 360);
    let noneRandNumber = 30;
    let added = false;

    return {
        ended: false,
        next(angle: number): number {
            if (this.ended) {
                console.error('Timer should be cleaned');
                return angle;
            }

            let delta = noneRandNumber / 300;
            noneRandNumber -= delta;

            if (noneRandNumber < 0.02) {
                this.ended = true;
                return angle % 360;
            }

            let newAngle = angle;
            if (noneRandNumber > 20){
                newAngle += 30 - noneRandNumber;
            }
            else{
                newAngle += noneRandNumber;
            }

            if (noneRandNumber < 20.5 && noneRandNumber > 19.5 && !added) {
                newAngle += randNumber;
                added = true
            }

            return newAngle;
        }
    };
}
