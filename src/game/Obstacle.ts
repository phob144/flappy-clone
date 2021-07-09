import * as PIXI from 'pixi.js';
import { Graphics, Rectangle } from 'pixi.js';
import { Hitbox } from './Hitbox';
import { IDrawable } from './IDrawable';
import { IUpdatable } from './IUpdatable';

export class Obstacle implements IUpdatable, IDrawable {
    public static readonly WIDTH = 100;

    public x: number;
    public velocityX: number;

    public hitbox: Hitbox;

    private _topTexture: Graphics;
    private _bottomTexture: Graphics;

    constructor(
        x: number,
        velocityX: number,
        gapY: number,
        gapHeight: number,
        app: PIXI.Application
    ) {
        const topRect = new Rectangle(x, 0, Obstacle.WIDTH, gapY);
        const bottomRect = new Rectangle(
            x,
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

        app.stage.addChild(this._topTexture);
        app.stage.addChild(this._bottomTexture);
    }

    public static createRandomObstacle(app: PIXI.Application): Obstacle {
        const gapHeight = 600 / 4;

        return new Obstacle(
            STAGE_WIDTH,
            OBSTACLE_VELOCITY,
            Random.next(0, 600 - gapHeight),
            gapHeight,
            app
        );
    }

    draw(delta: number): void {
        this._topTexture.x += this.velocityX;
        this._bottomTexture.x += this.velocityX;
    }

    update(delta: number): void {
        this.x += this.velocityX;
    }
}
