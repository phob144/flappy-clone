import { Rectangle } from 'pixi.js';

export class Hitbox {
    public rectangles: Rectangle[];

    constructor(rectangles: Rectangle[]) {
        this.rectangles = rectangles;
    }

    public areColliding(hitbox: Hitbox): boolean {
        for (let i = 0; i < this.rectangles.length; i++) {
            for (let j = i + 1; j < hitbox.rectangles.length; j++) {
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
        let x1 = rect2.left;
        let y1 = rect2.top;
        let x2 = rect2.right;
        let y2 = rect2.bottom;

        if (
            rect1.contains(x1, y1) ||
            rect1.contains(x1, y2) ||
            rect1.contains(x2, y1) ||
            rect1.contains(x2, y2)
        ) {
            return true;
        }

        return false;
    }
}
