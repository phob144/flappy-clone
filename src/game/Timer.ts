import { IUpdatable } from './IUpdatable';

export class Timer implements IUpdatable {
    public stopped: boolean;

    private _action: () => void;
    private _interval: number;
    private _time: number;

    constructor(interval: number, action: () => void) {
        this._action = action;
        this._interval = interval;
        this._time = 0;

        this.stopped = false;
    }

    update(delta: number): void {
        if (this.stopped) {
            return;
        }

        this._time += delta;

        if (this._time >= this._interval) {
            this._time -= this._interval;

            // call function on elapsed
            this._action();
        }
    }
}
