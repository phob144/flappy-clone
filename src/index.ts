import * as PIXI from 'pixi.js';
import { Graphics } from 'pixi.js';
import { ObstacleManager } from './game/ObstacleManager';
import { Player } from './game/Player';

class Game {
    private _app: PIXI.Application;

    constructor() {
        this._app = new PIXI.Application({
            width: 800,
            height: 600,
            resolution: 1,
        });

        // this._manager = new ObstacleManager(4, this._app);
        this._player = new Player(100, 600 / 4, -10, this._app);

        this._app.ticker.add((delta) => this.update(delta));
        this._app.ticker.add((delta) => this.draw(delta));

        this._app.ticker.start();

        document.body.appendChild(this._app.view);
    }

    private draw(delta: number) {
        // this._manager.draw(delta);
        this._player.draw(delta);
    }

    private _manager: ObstacleManager;
    private _player: Player;

    private update(delta: number) {
        // this._manager.update(delta);
        this._player.update(delta);
    }
}

const game = new Game();
