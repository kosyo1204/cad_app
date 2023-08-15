import { Rectangle } from './components/Rectangle';
import { Shape } from "./components/Shape";
import { Line } from "./components/Line";
import { Circle } from "./components/Circle";
import { Heart } from "./components/Heart";
import { Operation, CreateShapeOperation, RemoveShapeOperation, EditShapeOperation } from './operation';

export class CAD {
    // キャンバス要素
    private readonly _canvas : HTMLCanvasElement;
    private readonly _context : CanvasRenderingContext2D;
    // 図形の中の色
    private readonly _fillColor: HTMLInputElement
    // カラーピッカー要素
    private readonly _colorPicker : HTMLInputElement;
    // ペンの太さ要素
    private readonly _penWidthInput : HTMLInputElement;
    // 消しゴムボタン要素
    private readonly _eraserButton : HTMLButtonElement;
    // ペンボタン要素
    private readonly _penButton : HTMLButtonElement;
    // 四角形ボタン要素
    private readonly _rectangleButton : HTMLButtonElement;
    // 円ボタン要素
    private readonly _circleButton : HTMLButtonElement;
    // ハートボタン要素
    private readonly _heartButton : HTMLButtonElement;
    // 戻るボタン要素
    private readonly _undoButton : HTMLButtonElement;
    // 保存ボタン要素を取得
    private readonly _saveButton : HTMLButtonElement;
    // 全リセットボタン要素
    private readonly _resetButton : HTMLButtonElement;

    private _isDrawing = false;
    private _isErasing = false;
    private _isDrawingRectangle = false; // 四角形を描画中かどうかのフラグ
    private _isDrawingCircle = false; // 円を描画中かどうかのフラグ
    private _isDrawingHeart = false; // ハートを描画中かどうかのフラグ
    private _startX = 0;
    private _startY = 0;
    private _endX = 0;
    private _endY = 0;
    private _drawingHistory: ImageData[] = [];
    private _angle = 0;
    private _currentX = 0;
    private _currentY = 0;
    // 描画された図形の一覧（Zオーダー順。最後が最前面。）
    // 描画したら末尾に追加してください。
    private _sortedShapes: Shape[] = [];
    // 選択中の図形
    // 何も選択していないとき、描画中でないときは null です。
    // 新しい図形を描き始めるときは、これに新しいインスタンスを設定してください。
    private _selectedShape: Shape|null = null;
    // 図形かどうかのフラグ
    private _isShape = false;
    // 現在選択中の機能
    private _currentOperation: Operation | null = null;

    // 消しゴムの描画関数
    private eraseLine(x: number, y: number, eraserWidth: number) {
        this._context.clearRect(x - eraserWidth / 2, y - eraserWidth / 2, eraserWidth, eraserWidth);
    }

    // 四角形の描画関数
    private drawRectangle(startX: number, startY: number, endX: number, endY: number, borderColor: string, fillColor: string, size: number, angle: number, currentX: number, currentY: number ) {
        const rectangle = new Rectangle(startX, startY, endX, endY, borderColor, fillColor, size, angle, currentX, currentY);
        rectangle.drawing(this._context);
    }

    // 円の描画関数
    private drawCircle(startX: number, startY: number, endX: number, endY: number, borderColor: string,fillColor: string, size: number, angle: number, currentX: number, currentY: number) {
        const circle = new Circle(startX, startY, endX, endY, borderColor, fillColor, size, angle, currentX, currentY);
        circle.drawing(this._context);
    }

    // ハートの描画関数
    private drawHeart(startX: number, startY: number, endX: number, endY: number, borderColor: string,fillColor: string, size: number, angle: number, currentX: number, currentY: number) {
        const heart = new Heart(startX, startY, endX, endY, borderColor, fillColor, size, angle, currentX, currentY);
        heart.drawing(this._context);
    }

    constructor(document: Document) {
        this._canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this._context = this._canvas.getContext('2d') as CanvasRenderingContext2D;
        this._colorPicker = document.getElementById('colorPicker') as HTMLInputElement;
        this._fillColor = document.getElementById('color2') as HTMLInputElement;
        this._penWidthInput = document.getElementById('penWidth') as HTMLInputElement;
        this._eraserButton = document.getElementById('eraserButton') as HTMLButtonElement;
        this._penButton = document.getElementById('penButton') as HTMLButtonElement;
        this._rectangleButton = document.getElementById('rectangleButton') as HTMLButtonElement;
        this._circleButton = document.getElementById('circleButton') as HTMLButtonElement;
        this._heartButton = document.getElementById('heartButton') as HTMLButtonElement;
        this._undoButton = document.getElementById('undoButton') as HTMLButtonElement;
        this._saveButton = document.getElementById('saveButton') as HTMLButtonElement;
        this._resetButton = document.getElementById('resetButton') as HTMLButtonElement;

        // マウスイベントの監視
        this._canvas.addEventListener('mousedown', (e) => {
            this._currentOperation?.onMouseDown(e.clientX - this._canvas.offsetLeft, e.clientY - this._canvas.offsetTop);
            this._isDrawing = true;
            this._startX = e.clientX - this._canvas.offsetLeft;
            this._startY = e.clientY - this._canvas.offsetTop;
            if (this._isErasing) {
                const eraserWidth = parseInt(this._penWidthInput.value);
                this.eraseLine(this._startX, this._startY, eraserWidth);
            } else if (this._isShape) {
                // 図形を描画中の場合、マウスを押した位置を保存
                this._startX = e.clientX - this._canvas.offsetLeft;
                this._startY = e.clientY - this._canvas.offsetTop;
            } else {
                // ペンを描画中の場合、直前の位置に点を打つことで滑らかな線を引く
                const size = parseInt(this._penWidthInput.value);
                const line = new Line(this._startX,this._startY,this._endX,this._endY,this._colorPicker.value, this._fillColor.value,size,0,this._currentX,this._currentY);
                line.drawStart(this._context);

            }
        });
        this._canvas.addEventListener('mousemove', (e) => {
            this._currentOperation?.onMouseMove(e.clientX - this._canvas.offsetLeft, e.clientY - this._canvas.offsetTop);
            if (this._isDrawing) {
                const currentX = e.clientX - this._canvas.offsetLeft;
                const currentY = e.clientY - this._canvas.offsetTop;
                if (this._isErasing) {
                    const eraserWidth = parseInt(this._penWidthInput.value);
                    this.eraseLine(currentX, currentY, eraserWidth);
                } else if (this._isDrawingRectangle) {
                    // 四角形を描画中の場合、一時的な四角形を描画
                    this._endX = e.clientX - this._canvas.offsetLeft;
                    this._endY = e.clientY - this._canvas.offsetTop;
                    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
                    for (const imageData of this._drawingHistory) {
                        this._context.putImageData(imageData, 0, 0);
                    }
                    this.drawRectangle(this._startX, this._startY, this._endX, this._endY, this._colorPicker.value, this._fillColor.value, parseInt(this._penWidthInput.value), this._angle, currentX, currentY);
                } else if (this._isDrawingCircle) {
                    // 円を描画中の場合、一時的な円を描画
                    this._endX = e.clientX - this._canvas.offsetLeft;
                    this._endY = e.clientY - this._canvas.offsetTop;
                    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
                    for (const imageData of this._drawingHistory) {
                        this._context.putImageData(imageData, 0, 0);
                    }
                    this.drawCircle(this._startX, this._startY, this._endX, this._endY, this._colorPicker.value, this._fillColor.value, parseInt(this._penWidthInput.value) ,this._angle, currentX, currentY);
                } else if (this._isDrawingHeart) {
                // ハートを描画中の場合、一時的な円を描画
                    this._endX = e.clientX - this._canvas.offsetLeft;
                    this._endY = e.clientY - this._canvas.offsetTop;
                    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
                    for (const imageData of this._drawingHistory) {
                        this._context.putImageData(imageData, 0, 0);
                    }
                    this.drawHeart(this._startX, this._startY, this._endX, this._endY, this._colorPicker.value, this._fillColor.value, parseInt(this._penWidthInput.value) ,this._angle, currentX, currentY);
                } else {
                    // ペンを描画中の場合、直前の位置から現在の位置まで線を引く
                    const size = parseInt(this._penWidthInput.value);
                    const line = new Line(this._startX,this._startY,this._endX,this._endY,this._colorPicker.value,this._fillColor.value,size,0,currentX,currentY);
                    line.drawing(this._context);
                    line.updateCurrentPosition(currentX, currentY)
                    this._startX = currentX;
                    this._startY = currentY;
                }
            }
        });

        this._canvas.addEventListener('mouseup', (e) => {
            this._currentOperation?.onMouseMove(e.clientX - this._canvas.offsetLeft, e.clientY - this._canvas.offsetTop);

            if (this._isShape) {
                this._endX = e.clientX - this._canvas.offsetLeft;
                this._endY = e.clientY - this._canvas.offsetTop;
                const penColor = this._colorPicker.value;
                if (this._isDrawingRectangle){
                    // 四角形
                    this.drawRectangle(this._startX, this._startY, this._endX, this._endY, this._colorPicker.value, this._fillColor.value, parseInt(this._penWidthInput.value), this._angle, this._currentX, this._currentY);
                } else if (this._isDrawingCircle) {
                    // 円
                    this.drawCircle(this._startX, this._startY, this._endX, this._endY, this._colorPicker.value, this._fillColor.value, parseInt(this._penWidthInput.value), this._angle, this._currentX, this._currentY);
                } else if (this._isDrawingHeart) {
                    this.drawHeart(this._startX, this._startY, this._endX, this._endY, this._colorPicker.value, this._fillColor.value, parseInt(this._penWidthInput.value), this._angle, this._currentX, this._currentY);
                }
            }
            const canvasData = this._context.getImageData(0, 0, this._canvas.width, this._canvas.height);
            this._drawingHistory.push(canvasData);
            this._isDrawing = false;
        });


        this._canvas.addEventListener('mouseleave', () => {
            this._currentOperation?.onMouseLeave();
            if (this._isShape) {
                // 図形描画中にキャンバス外にマウスが移動した場合は、描画を終了して保存
                this._isDrawing = false;
                const canvasData = this._context.getImageData(0, 0, this._canvas.width, this._canvas.height);
                this._drawingHistory.push(canvasData);
            } else {
                this._isDrawing = false;
            }
        });

        this._canvas.addEventListener('click', event => {
            this._currentOperation?.onClick(event.offsetX, event.offsetY);
            const x = event.offsetX;
            const y = event.offsetY;

            // クリックされた座標がどの図形に対応するかを判定する
            // 後ろから順に要素を探す
            const len = this._sortedShapes.length;
            for (let i = len - 1; i >= 0; i--) {
                const shape = this._sortedShapes[i];
                if (shape.isPointInside(x, y)) {
                    this._selectedShape = shape;
                    // 図形消す
                    break;
                }
            }

            this._selectedShape?.drawing(this._context);
        });

        // 消しゴムボタンのクリックイベント
        this._eraserButton.addEventListener('click', () => {
            this._isDrawingRectangle = false; // 四角形描画モードを解除
            this._isDrawingCircle = false; // 円描画モードを解除
            this._isDrawingHeart = false; // ハート描写モードを解除
            if (this._isErasing) {
                this._colorPicker.value = '#ffffff'; // 消しゴムを使う場合はカラーピッカーの値を白色に設定
            }
            this._isErasing = true;
        });

        // ペンボタンのクリックイベント
        this._penButton.addEventListener('click', () => {
            this._isErasing = false;
            this._isDrawingRectangle = false;
            this._isDrawingCircle = false;
            this._isDrawingHeart = false;
            this._isShape = false; // 図形フラグ
        });

        // 四角形ボタンのクリックイベント
        this._rectangleButton.addEventListener('click', () => {
            this._isErasing = false;
            this._isDrawingCircle = false;
            this._isDrawingHeart = false;
            this._isDrawingRectangle = true;
            this._isShape = true; // 図形フラグ
        });

        // 円ボタンのクリックイベント
        this._circleButton.addEventListener('click', () => {
            this._isErasing = false;
            this._isDrawingRectangle = false;
            this._isDrawingHeart = false;
            this._isDrawingCircle = true;
            this._isShape = true; // 図形フラグ
        });

        // ハートボタンのクリックイベント
        this._heartButton.addEventListener('click', () => {
            this._isErasing = false;
            this._isDrawingRectangle = false;
            this._isDrawingHeart = false;
            this._isDrawingCircle = false;
            this._isDrawingHeart = true;
            this._isShape = true; // 図形フラグ
        });

        // 戻るボタンのクリックイベント
        this._undoButton.addEventListener('click', () => {
            if (this._drawingHistory.length >= 1) {
                // 最新のキャンバスの状態を破棄して一つ前の状態に戻す
                this._drawingHistory.pop();
                this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
                const lastState = this._drawingHistory[this._drawingHistory.length - 1];
                this._context.putImageData(lastState, 0, 0);
            }
        });

        //保存ボタンのクリックエベント
        this._saveButton.addEventListener('click', () => {
            // Canvasの描画内容を画像に変換
            const dataURL = this._canvas.toDataURL('image/png'); // キャンバスの内容を画像としてエンコード
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'canvas_drawing.png'; // ダウンロード時のファイル名を指定
            link.click();
        });

        //全リセットボタンのクリックエベント
        this._resetButton.addEventListener('click', () => {
            this._drawingHistory = []; // 描画履歴をクリア
            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height); // キャンバスをクリア
            this._isErasing = false;
            this._isDrawingRectangle = false;
            this._isDrawingCircle = false;
            this._isDrawingHeart = false;
            this._isShape = false;
        });
    }
}