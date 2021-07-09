import * as PIXI from 'pixi.js';
import { Graphics, Point, Rectangle } from 'pixi.js';
import { Hitbox } from './Hitbox';
import { IDrawable } from './IDrawable';
import { IUpdatable } from './IUpdatable';

export class Player implements IUpdatable, IDrawable {
    public static readonly WIDTH = 50;
    public static readonly HEIGHT = 50;

    public x: number;
    public y: number;
    public velocityY: number;

    public hitbox: Hitbox;

    private _texture: Graphics;

    constructor(
        x: number,
        y: number,
        velocityY: number,
        app: PIXI.Application
    ) {
        this.x = x;
        this.y = y;
        this.velocityY = velocityY;

        this.hitbox = new Hitbox([
            new Rectangle(x, y, Player.WIDTH, Player.HEIGHT),
        ]);

        this._texture = new Graphics();

        this._texture.beginFill(0xffffff);
        this._texture.drawCircle(x, y, Player.WIDTH / 2);
        this._texture.endFill();

        this._texture.x = x;
        this._texture.y = y;

        app.stage.addChild(this._texture);
    }

    public jump() {
        this.velocityY = -20;
    }

    draw(delta: number): void {
        this._texture.y = this.y;
    }

    update(delta: number): void {
        this.velocityY += delta;
        this.y += this.velocityY * delta;

        if (this.y >= 400) {
            this.jump();
        }
    }
}
