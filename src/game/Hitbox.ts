import { Rectangle } from 'pixi.js';

export class Hitbox {
    public rectangles: Rectangle[];

    constructor(rectangles: Rectangle[]) {
        this.rectangles = rectangles;
    }

    public areColliding(hitbox: Hitbox): boolean {
        for (let i = 0; i < this.rectangles.length; i++) {
            for (let j = i; j < hitbox.rectangles.length; j++) {
                if (
                    this.areRectanglesColliding(
                        this.rectangles[i],
                        hitbox.rectangles[j]
                    )
                ) {
                    return true;
                }
            }
        }

        return false;
    }

    private areRectanglesColliding(
        rect1: Rectangle,
        rect2: Rectangle
    ): boolean {
        let result =
            rect1.x + rect1.width > rect2.x &&
            rect1.x < rect2.x + rect2.width &&
            rect1.y + rect1.height > rect2.y &&
            rect1.y < rect2.y + rect2.height;

        console.log(result);

        return result;
    }
}
