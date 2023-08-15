import { Shape } from './Shape';

export class Circle extends Shape {
    constructor(startX: number, startY: number, endX: number, endY: number, borderColor: string, fillColor: string, size: number, angle: number, currentX: number, currentY: number) {
        super(startX, startY, endX, endY, borderColor, fillColor, size, angle, currentX, currentY);
    }

    drawing(context: CanvasRenderingContext2D): void {
        const radius = Math.sqrt((this._endX - this._startX) ** 2 + (this._endY - this._startY) ** 2);

        context.lineWidth = this._size;        
        context.strokeStyle = this._borderColor;
        context.fillStyle = this._fillColor;
        context.beginPath();
        context.arc(this._startX, this._startY, radius, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
        context.closePath();
    }

    drawStart(context: CanvasRenderingContext2D): void {
        // ドラッグ開始時の処理
    }

    update(context: CanvasRenderingContext2D, isHighlighted: boolean): void {
        //todo
    }
    isPointInside(x: number, y: number): boolean {
        return false;
    }
}
