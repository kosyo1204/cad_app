// import { ShapeSettings, Shape_2 } from "./components/Shape_2";

// export interface Paint {
//     get canvas(): HTMLCanvasElement;
//     get ctx(): CanvasRenderingContext2D;
//     get sortedShapes(): Shape_2[];
// }

// export abstract class Operation {
//     protected readonly _paint: Paint;
//     /*
//         【ChatGPT】
//         'mousedown' イベントは、マウスボタンが押された瞬間に発生します。つまり、ボタンをクリックした瞬間に発火します。このイベントはボタンが押される瞬間に反応するため、ボタンを押し続けている間も連続的にイベントが発生します。
//     */
//     public abstract onMouseDown(x:number, y:number): void;
//     public abstract onMouseUp(x:number, y:number): void;
//     public abstract onMouseMove(x:number, y:number): void;
//     public abstract onMouseLeave(): void;
//     /*
//         【ChatGPT】
//         'click' イベントは、マウスボタンをクリックした後に発生します。ボタンが押されてから離されるまでに短い時間（通常は 500 ミリ秒以下）で離された場合に 'click' イベントが発火します。
//         'click' イベントは、ユーザがボタンを押してから離すまでの操作を完了した後に反応するため、ボタンを押してから指を離すまでの間に何かしらの動作が行われた場合は 'click' イベントは発生しません。このため、一連の操作を完了させた後に反応させたい場合によく使われます。
//     */
//     public abstract onClick(x:number, y:number): void;
//     // 実行中の操作を中止します。
//     public abstract cancel(): void;

//     protected constructor(paint: Paint) {
//         this._paint = paint;
//     }
// }

// export class CreateShapeOperation extends Operation {
//     private readonly _create: (settings: ShapeSettings) => Shape_2;
//     public override onClick(x: number, y: number): void {
//         // TODO: 実装する。
//     }
//     public override onMouseDown(): void {
//         // TODO: 実装する。
//     }
//     public override onMouseUp(): void {
//         // TODO: 実装する。
//     }
//     public override onMouseMove(): void {
//         // TODO: 実装する。
//     }
//     public override onMouseLeave(): void {
//         // TODO: 実装する。
//     }
//     public override cancel(): void {
//         // TODO: 実装する。
//     }

//     public constructor(paint: Paint, create: (settings: ShapeSettings) => Shape_2) {
//         super(paint);
//         this._create = create;
//     }
// }

// export class RemoveShapeOperation extends Operation {
//     // 選択中の図形を削除するメソッド
//     // private removeSelectedShape() {
//     //     for (const shape of selectedShapes) {
//     //         // 図形を消去するための処理（例：削除のロジック）
//     //         shape.remove();
//     //     }
//     // }
//     public override onClick(x: number, y: number): void {
//         // クリックされた座標がどの図形に対応するかを判定する
//         // 後ろから順に要素を探す
//         // const len = this._paint.sortedShapes.length;
//         // for (let i = len - 1; i >= 0; i--) {
//         //     const shape = this._paint.sortedShapes[i];
//         //     if (shape.isPointInside(x, y)) {
//         //         // 図形消す
//         //         this._paint.sortedShapes.remove(shape);
//         //         break;
//         //     }
//         // }
//     }

//     public override onMouseDown(): void {
//         // TODO: 実装する。
//     }
//     public override onMouseUp(): void {
//         // TODO: 実装する。
//     }
//     public override onMouseMove(): void {
//         // TODO: 実装する。
//     }
//     public override onMouseLeave(): void {
//         // TODO: 実装する。
//     }
//     public override cancel(): void {
//         // TODO: 実装する。
//     }

//     public constructor(paint: Paint) {
//         super(paint);
//     }
// }

// export class EditShapeOperation extends Operation {
//     public override onClick(x: number, y: number): void {
//         // TODO: 実装する。
//     }
//     public override onMouseDown(): void {
//         // TODO: 実装する。
//     }
//     public override onMouseUp(): void {
//         // TODO: 実装する。
//     }
//     public override onMouseMove(): void {
//         // TODO: 実装する。
//     }
//     public override onMouseLeave(): void {
//         // TODO: 実装する。
//     }
//     public override cancel(): void {
//         // TODO: 実装する。
//     }

//     public constructor(paint: Paint) {
//         super(paint);
//     }
// }