import { Shape } from './Shape';

export class Rectangle extends Shape {

    constructor(startX: number, startY: number, endX: number, endY: number, borderColor: string, fillColor: string, size: number, angle: number, currentX: number, currentY: number) {
        super(startX, startY, endX, endY, borderColor, fillColor, size, angle, currentX, currentY);
    }

    /**
     * 図形をCanvasに描画するメソッドです。
     * @param context CanvasRenderingContext2D - 描画コンテキスト
     */
    drawing(context: CanvasRenderingContext2D): void {
        // 長方形の幅と高さを始点と終点から計算します
        const _width = Math.abs(this._endX - this._startX);
        const _height = Math.abs(this._endY - this._startY);
    
        // 開始点と終了点の切り替え
        let startX = this._startX;
        let startY = this._startY;
        let endX = this._endX;
        let endY = this._endY;
    
        // ドラッグ方向に応じて切り替え
        if (this._endX < this._startX) {
            startX = this._endX;
            endX = this._startX;
        }
        if (this._endY < this._startY) {
            startY = this._endY;
            endY = this._startY;
        }
    
        // 回転変換を適用して、正しい角度で長方形を描画します
        context.translate(startX + _width / 2, startY + _height / 2);
        context.rotate((this._angle * Math.PI) / 180);
        context.translate(-(startX + _width / 2), -(startY + _height / 2));
    
        // 長方形の塗りつぶし色とボーダーの色を設定します
        context.fillStyle = this._fillColor;
        context.strokeStyle = this._borderColor;
        context.lineWidth = this._size;
    
        // 長方形の描画
        const offset = this._size / 2;
        context.strokeRect(startX + offset, startY + offset, _width - this._size, _height - this._size);
        context.fillRect(startX + this._size, startY + this._size, _width - 2 * this._size, _height - 2 * this._size);
    
        // 変換をリセットして他の図形に影響を与えないようにします
        context.setTransform(1, 0, 0, 1, 0, 0);
    }
    

    /**
     * 指定された座標が図形の内部にあるかどうかを判定するメソッドです。
     * @param x number - X座標
     * @param y number - Y座標
     * @returns boolean - 指定された座標が図形の内部にある場合はtrue、そうでない場合はfalse
     */
    isPointInside(x: number, y: number): boolean {
        // 長方形の範囲内かどうかを判定します
        return (
            x >= this._startX && x <= this._endX &&
            y >= this._startY && y <= this._endY
        );
    }

    drawStart(context: CanvasRenderingContext2D): void {
        //todo
    }
    update(context: CanvasRenderingContext2D, isHighlighted: boolean): void {
        //todo
    }
    remove(): void {
    }
}
