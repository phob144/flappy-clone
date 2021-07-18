import * as PIXI from 'pixi.js';
import { Graphics, Point, Rectangle, Container } from 'pixi.js';
import { Hitbox } from './Hitbox';
import { IUpdatable } from './IUpdatable';
import { GameSettings } from '../const';

export class Player extends Container implements IUpdatable {
    public static readonly WIDTH = 50;
    public static readonly HEIGHT = 50;

    public velocityY: number = 0;

    public hitbox: Hitbox;

    private _texture: Graphics;

    constructor() {
        super();

        this.x = 150;
        this.y = 325;

        this.hitbox = new Hitbox([
            new Rectangle(0, 0, Player.WIDTH, Player.HEIGHT),
        ]);

        this._initTexture();
        this._initKeyboard();
    }

    update(delta: number): void {
        this.velocityY += GameSettings.GRAVITY;
        this.y += this.velocityY;

        if (this.y > GameSettings.STAGE_HEIGHT - Player.WIDTH / 2) {
            this.y = GameSettings.STAGE_HEIGHT - Player.WIDTH / 2;

            // bounce
            this.velocityY = (-this.velocityY * 2) / 3;
        }

        if (this.y < Player.WIDTH / 2) {
            this.y = Player.WIDTH / 2;

            // stop
            this.velocityY = 0;
        }

        // this surely can be done way better, but it's a simple game, so no need to sweat
        /*
        But you could again, add this hitbox as a child, or use the built in https://pixijs.download/dev/docs/PIXI.Container.html#getBounds,
        and move the areColliding and areRectanglesColliding into an util static class
         */
        this.hitbox.rectangles[0].y = this.y;
    }

    private _initTexture() {
        this._texture = new Graphics();

        this._texture.beginFill(0xffffff);
        this._texture.drawCircle(0, 0, Player.WIDTH / 2);
        this._texture.endFill();

        this.addChild(this._texture);
    }

    private _initKeyboard() {
        //Attach event listeners
        const downListener = this._downHandler.bind(this);

        window.addEventListener('keydown', downListener, false);
    }

    private _downHandler(event: KeyboardEvent) {
        if (event.key == 'ArrowUp') {
            this.velocityY = -10;
        }
    }
}
