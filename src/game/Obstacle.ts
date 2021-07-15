import * as PIXI from 'pixi.js';
import { Graphics, Rectangle, Container } from 'pixi.js';
import { Hitbox } from './Hitbox';
import { IUpdatable } from './IUpdatable';
import { GameSettings } from '../const';
import { Random } from '../utils/Random';

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

        this._velocityX = -10;

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

    public static createRandomObstacle(): Obstacle {
        const gapHeight = 600 / 4;

        return new Obstacle(Random.next(0, 600 - gapHeight), gapHeight);
    }

    update(delta: number): void {
        this.x += this._velocityX;

        // this surely can be done way better, but it's a simple game, so no need to sweat
        this.hitbox.rectangles[0].x = this.x;
        this.hitbox.rectangles[1].x = this.x;
    }
}
