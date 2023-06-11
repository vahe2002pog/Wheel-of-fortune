interface IRotateResult {
    ended: boolean;
    angle: number;
}

export function getAngelRunner() {
    const randNumber = Math.floor(Math.random() * Math.floor(360));
    let noneRandNumber = 30;
    let added = false;
    let ended = false

    return (angle: number): IRotateResult => {
        if (ended) {
            console.error('Timer should be cleaned');
            return { angle, ended };
        }

        let delta = noneRandNumber / 800;
        noneRandNumber -= delta;

        if (noneRandNumber < 0.01) {
            ended = true;
            return { angle: angle % 360, ended };
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

        return { angle: newAngle, ended };
    }
}
