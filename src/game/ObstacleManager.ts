import * as PIXI from 'pixi.js';
import { IDrawable } from './IDrawable';
import { IUpdatable } from './IUpdatable';
import { Obstacle } from './Obstacle';
import { Timer } from './Timer';

export class ObstacleManager implements IUpdatable, IDrawable {
    private _queue: Obstacle[];
    private _timer: Timer;

    private _app: PIXI.Application;

    constructor(interval: number, app: PIXI.Application) {
        this._queue = [];
        this._timer = new Timer(interval, this.enqueueObstacle);

        this._app = app;
    }

    private enqueueObstacle() {
        this._queue.push(Obstacle.createRandomObstacle(this._app));
    }

    private dequeueObstacle() {
        let obstacle = this._queue.shift();
    }

    draw(delta: number): void {
        for (let i = 0; i < this._queue.length; i++) {
            this._queue[i].draw(delta);
        }
    }

    update(delta: number): void {
        this._timer.update(delta);

        for (let i = 0; i < this._queue.length; i++) {
            this._queue[i].update(delta);
        }

        // delete if outside of the window
        // if (this._queue[this._queue.length - 1].x <= -Obstacle.WIDTH) {
        //     this.dequeueObstacle();
        // }
    }
}
