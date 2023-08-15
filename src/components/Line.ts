import { Shape } from './Shape';

export class Line extends Shape {
    constructor(_startX: number, _startY: number, _endX: number, _endY: number, _borderColor: string, _fillColor: string, _size: number, _angle: number, _currentX: number, _currentY: number) {
        super(_startX, _startY, _endX, _endY, _borderColor, _fillColor, _size, _angle, _currentX, _currentY);
    }

    drawStart(context: CanvasRenderingContext2D) {
        context.strokeStyle = this._borderColor;
        context.lineWidth = this._size;
        context.lineCap = 'round';
        context.beginPath();
        context.moveTo(this._startX, this._startY);
        context.lineTo(this._startX, this._startY);
        context.stroke();
        context.closePath();
    }

    drawing(context: CanvasRenderingContext2D) {
        context.strokeStyle = this._borderColor;
        context.lineWidth = this._size;
        context.lineCap = 'round';
        context.beginPath();
        context.moveTo(this._startX, this._startY);
        context.lineTo(this._currentX, this._currentY);
        context.stroke();
        context.closePath();
    }

    update(){
    }

    remove(): void {
    }

    isPointInside(x: number, y: number): boolean{
        return false;
    }

    updateCurrentPosition(currentX: number, currentY: number) {
        this._currentX = currentX;
        this._currentY = currentY;
    }

}