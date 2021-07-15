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

        this._manager = new ObstacleManager(1.5);
        this._player = new Player();

        this._app.stage.addChild(this._manager);
        this._app.stage.addChild(this._player);

        this._app.ticker.add((delta) => this.update(delta));
        this._app.ticker.start();

        document.body.appendChild(this._app.view);
    }

    private _manager: ObstacleManager;
    private _player: Player;

    private update(delta: number) {
        this._manager.update(delta);
        this._player.update(delta);
        this._checkCollision();
    }

    private _checkCollision() {
        // if (this._manager.checkCollision(this._player.hitbox)) {
        //     console.log('collide');
        //     // reset
        //     this._app.stage.removeChildren(0, this._app.stage.children.length);
        //     this._manager = new ObstacleManager(1.5);
        //     this._player = new Player();
        //     this._app.stage.addChild(this._manager);
        //     this._app.stage.addChild(this._player);
        // }
    }
}

const game = new Game();
