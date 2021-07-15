import * as PIXI from 'pixi.js';
import { Container } from 'pixi.js';
import { Hitbox } from './Hitbox';
import { IUpdatable } from './IUpdatable';
import { Obstacle } from './Obstacle';
import { Timer } from './Timer';

export class ObstacleManager extends Container implements IUpdatable {
    private _queue: Obstacle[];
    private _timer: Timer;

    constructor(interval: number) {
        super();

        this._queue = [];
        this._timer = new Timer(interval);
    }

    private enqueueObstacle() {
        let obstacle = Obstacle.createRandomObstacle();

        this._queue.push(obstacle);
        this.addChild(obstacle);
    }

    public checkCollision(hitbox: Hitbox): boolean {
        for (let i = 0; i < this._queue.length; i++) {
            if (this._queue[i].hitbox.areColliding(hitbox)) {
                return true;
            }
        }

        return false;
    }

    update(delta: number): void {
        this._timer.update(delta);

        if (this._timer.elapsed()) {
            this.enqueueObstacle();
        }

        for (let i = 0; i < this._queue.length; i++) {
            this._queue[i].update(delta);
        }

        // bruteforce unloading
        if (this._queue.length >= 4) {
            let obstacle = this._queue.shift();

            this.removeChild(obstacle);
        }
    }
}
