export class Random {
    public static next(min: number, max: number) {
        return Math.floor(Math.random() * max + min);
    }
}
