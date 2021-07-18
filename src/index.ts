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

        /* proponuje uzywanie https://pixijs.download/dev/docs/PIXI.Ticker.html
        wbudowane w pixi, wepniesz pozniej sobie w to animacje, partile, tweeny...
         */

        this._app.ticker.add((delta) => this.update(delta));
        this._app.ticker.start();

        document.body.appendChild(this._app.view);
    }

    // proponuje kolejnosc metod/propertiesow:
    /*
    static prop
    public  prop
    private prop
    constructor
    public method
    private method
    getters/setters
     */
    private _manager: ObstacleManager;
    private _player: Player;

    private update(delta: number) {
        this._manager.update(delta);
        this._player.update(delta);
        this._checkCollision();
    }

    /*
    - obstacle
    Rectangle{x: -45, y: 0, width: 100, height: 87, type: 1} while the x varies, the y stays always 0 so the hitbox doesnt include the y position of the obstacle

    - player
    Rectangle{x: 0, y: 575, width: 50, height: 50, type: 1} this seems to be calculated correctly

     use console.log the logout the properties and debug, create debug tools, like textfiels showing the hitbox rectangles
     */
    private _checkCollision() {
        if (this._manager.checkCollision(this._player.hitbox)) {
            console.log('collide');
            // reset
            this._app.stage.removeChildren(0, this._app.stage.children.length);
            this._manager = new ObstacleManager(1.5);
            this._player = new Player();
            this._app.stage.addChild(this._manager);
            this._app.stage.addChild(this._player);
        }
    }
}

const game = new Game();
