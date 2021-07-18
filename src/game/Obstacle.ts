import * as PIXI from 'pixi.js';
import {Graphics, Rectangle, Container} from 'pixi.js';
import {Hitbox} from './Hitbox';
import {IUpdatable} from './IUpdatable';
import {GameSettings} from '../const';
import {Random} from '../utils/Random';

export class Obstacle extends Container implements IUpdatable {
    public static readonly WIDTH = 100;

    public hitbox: Hitbox;

    private _velocityX: number;

    private _topTexture: Graphics;
    private _bottomTexture: Graphics;

    constructor(gapY: number, gapHeight: number) {
        super();

        this.x = GameSettings.STAGE_WIDTH + Obstacle.WIDTH;
        this.y = 0;

        /*
        one of the most important things in creating a game is to put out all "interesting" properties,
        so a Game designer can modify them to make the game more interesting for the player.
        We wont always know which things they would like to change but for sure
        _velocityX is one of the key game modifiers
        Lets say the obstacles are too fast, I will modify _velocityX for -10 to -5, make them 2x slower, the game will stop working correctly
        Knowing how to build a game/app with places prepared so they can be modified is a good skill to have :)
         */
        this._velocityX = -15;

        const topRect = new Rectangle(this.x, 0, Obstacle.WIDTH, gapY);
        const bottomRect = new Rectangle(
            this.x,
            gapY + gapHeight,
            Obstacle.WIDTH,
            600 - (gapY + gapHeight)
        );

        this.hitbox = new Hitbox([topRect, bottomRect]);

        this._topTexture = new Graphics();
        this._topTexture.beginFill(0xffffff);
        this._topTexture.drawRect(
            topRect.x,
            topRect.y,
            topRect.width,
            topRect.height
        );
        this._topTexture.endFill();

        this._bottomTexture = new Graphics();
        this._bottomTexture.beginFill(0xffffff);
        this._bottomTexture.drawRect(
            bottomRect.x,
            bottomRect.y,
            bottomRect.width,
            bottomRect.height
        );
        this._bottomTexture.endFill();

        this.addChild(this._topTexture);
        this.addChild(this._bottomTexture);
    }

    /*
    this is a strange concept, a static method which generates an instance of a class of itself, maybe this methods should be in the ObstacleManager? as it manages (creates/destroys/updates) the obstacles
     */
    public static createRandomObstacle(): Obstacle {
        const gapHeight = 600 / 4;

        return new Obstacle(Random.next(0, 600 - gapHeight), gapHeight);
    }

    update(delta: number): void {
        this.x += this._velocityX;

        // this surely can be done way better, but it's a simple game, so no need to sweat
        /*
        same as in Player.ts L:51
         */
        this.hitbox.rectangles[0].x = this.x;
        this.hitbox.rectangles[1].x = this.x;
    }
}
