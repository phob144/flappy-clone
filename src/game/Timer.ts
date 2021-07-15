import { IUpdatable } from './IUpdatable';

export class Timer implements IUpdatable {
    public stopped: boolean;

    private _interval: number;
    private _time: number;

    constructor(interval: number) {
        this._interval = interval;
        this._time = 0;

        this.stopped = false;
    }

    public elapsed(): boolean {
        let result = this._time >= this._interval;

        if (result) {
            this._time -= this._interval;
        }

        return result;
    }

    update(delta: number): void {
        if (this.stopped) {
            return;
        }

        // console.log(delta) => "1" ???
        this._time += 0.0166666666666;
    }
}
