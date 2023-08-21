export class DrawingArea {
  private readonly _canvas : HTMLCanvasElement;
  private readonly _context : CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this._context = this._canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  // 四角形を描くメソッド
  drawRectangle(x: number, y: number, width: number, height: number, red: number, green: number, blue: number, alpha: number) {
    const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    this._context.fillStyle = color;
    this._context.fillRect(x, y, width, height);
  }

  // コマンドを受ける対象に実装されたメソッドは具象クラスから呼び出す
  addShape() {
    console.log('addShape');
    this.drawRectangle(50, 50, 100, 80, 255, 0, 0, 1);
  }
  removeShape() {
    console.log('removeShape');
  }
}