export class Wheel {
    private startAngle: number;
    private endAngle: number;
    private rotationTime: number;
    private startTime: number | null;
    private currentAngle: number;
    ended: boolean;

    constructor(startAngle: number) {
        this.startAngle = startAngle;
        this.endAngle = 360 * 2 + Math.floor(Math.random() * 360);
        this.rotationTime = 5000;
        this.startTime = null;
        this.currentAngle = startAngle;
        this.ended = false;
    }

    public rotate(previousTime: number): number {

        if (this.ended) {
            console.error('Timer should be cleaned');
            return this.currentAngle;
        }

        if (this.startTime === null) {
            this.startTime = previousTime;
        }

        const elapsedTime = previousTime - this.startTime;

        if (elapsedTime >= this.rotationTime) {
            this.currentAngle = this.endAngle % 360;
            this.ended = true;
        } else {
            const progress = elapsedTime / this.rotationTime;
            const angleDifference = this.endAngle - this.startAngle;
            const easingProgress = Math.sin(progress * Math.PI / 2);

            this.currentAngle = this.startAngle + angleDifference * easingProgress;
        }

        return this.currentAngle;
    }
}
