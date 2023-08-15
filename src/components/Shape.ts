// 図形の共通実装
export abstract class Shape {
    // 開始座標 X
    protected _startX: number;
    // 開始座標 Y
    protected _startY: number;
    // 終了座標 X
    protected _endX: number;
    // 終了座標 Y
    protected _endY: number;
    // 描画する色
    protected _borderColor: string;
    //図形の中の色
    protected _fillColor: string;
    // 描画するサイズ（X? Y?）
    protected _size: number;
    // 描画の傾き
    protected _angle: number;
    // 現在の座標X
    protected _currentX: number;
    // 現在の座標Y
    protected _currentY: number;

    constructor(startX: number, startY: number, endX: number, endY: number, borderColor: string, fillColor: string, size: number, angle: number, currentX: number, currentY: number) {
        this._startX = startX;
        this._startY = startY;
        this._endX = endX;
        this._endY = endY;
        this._borderColor = borderColor;
        this._size = size;
        this._angle = angle;
        this._fillColor= fillColor
        this._currentX = currentX;
        this._currentY = currentY;
    }

    // 現在の設定で図形を描画します。
    // context: 描画API
    // isHighlighted: true の場合はこの図形を目立たせます。主に、選択中であることを表現するために使用します。
    // 実装サンプル:
    //   draw(ctx: CanvasRenderingContext2D, isHighlighted: boolean) {
    //     if (isHighlighted) {
    //       // ハイライト表示用のスタイルを設定
    //       ctx.strokeStyle = 'red'; // 例：赤い枠でハイライト表示
    //     } else {
    //       // 通常のスタイルを設定
    //       ctx.strokeStyle = this.color;
    //     }
    //
    //     // Lineを描画するロジック
    //     // ...
    //   }
    abstract drawStart(context: CanvasRenderingContext2D): void;
    abstract drawing(context: CanvasRenderingContext2D): void;
    abstract update(context: CanvasRenderingContext2D, isHighlighted: boolean): void;
    // 点 (x, y) がこの図形内にあるかどうかを判定します。
    abstract isPointInside(x: number, y: number): boolean;
}
