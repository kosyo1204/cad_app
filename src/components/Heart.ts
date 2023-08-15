import { Shape } from './Shape';

export class Heart extends Shape {
    constructor(startX: number, startY: number, endX: number, endY: number, borderColor: string, fillColor: string, size: number, angle: number, currentX: number, currentY: number) {
        super(startX, startY, endX, endY, borderColor, fillColor, size, angle, currentX, currentY);
    }

    drawing(context: CanvasRenderingContext2D): void {
        const width = Math.abs(this._endX - this._startX);
        const height = Math.abs(this._endY - this._startY);
        const centerX = this._startX + (this._endX - this._startX) / 2; // Update centerX calculation
        const centerY = this._startY + height / 2;
        const radius = width / 4;

        context.lineWidth = this._size;
        context.strokeStyle = this._borderColor;
        context.fillStyle = this._fillColor;
        context.beginPath();

        // ハートの上部（半円）を描画
        if (this._endX < this._startX) {
            context.arc(centerX + radius, centerY, radius, 0, Math.PI, true); // Adjust the position of the arcs
            context.arc(centerX - radius, centerY, radius, 0, Math.PI, true);
        } else {
            context.arc(centerX - radius, centerY, radius, 0, Math.PI, true);
            context.arc(centerX + radius, centerY, radius, 0, Math.PI, true);
        }

        // ハートの下部（下向きの三角形）を描画
        context.moveTo(centerX - radius * 2, centerY);
        context.lineTo(centerX + radius * 2, centerY);
        context.lineTo(centerX, centerY + radius * 2);

        context.closePath();
        context.stroke();
        context.fill();
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
