// 図形描画の設定
export class ShapeSettings {
    // 位置座標 X
    public x: number;
    // 位置座標 Y
    public y: number;
    // 幅
    public width: number;
    // 高さ
    public height: number;
    // 傾き
    public angle: number;
    // 色
    public color: string;
    // ハイライト有無
    public isHighlight: boolean;
}

// 図形の共通実装
export abstract class Shape_2 {
    protected readonly _ctx: CanvasRenderingContext2D;
    protected _settings: ShapeSettings;

    // 現在の_settings で描画します。
    public abstract redraw(): void;
    // 点 (x, y) がこの図形内にあるかどうかを判定します。
    public abstract isPointInside(x: number, y: number): boolean;

    // settings で描画します。
    public draw(settings: ShapeSettings): void {
        this._settings = settings;
        this.redraw();
    }

    public remove(): void{
      // const index = this._ctx.sortedShapes.indexOf(this);
      // if (index !== -1) {
      //   this._ctx.sortedShapes.splice(index, 1);
      // }
    }

    public constructor(ctx: CanvasRenderingContext2D) {
        this._ctx = ctx;
    }
}

// 図形：矩形
export class Rectangle_2 extends Shape_2 {
    public override redraw(): void {
        // 長方形の幅と高さを始点と終点から計算します
        const _width = this._settings.width;
        const _height = this._settings.height;

        // 回転変換を適用して、正しい角度で長方形を描画します
        this._ctx.translate(this._settings.x + _width / 2, this._settings.y + _height / 2);
        this._ctx.rotate((this._settings.angle * Math.PI) / 180);
        this._ctx.translate(-(this._settings.x + _width / 2), -(this._settings.y + _height / 2));

        // 長方形の塗りつぶし色を指定された色に設定します
        this._ctx.fillStyle = this._settings.color;
        // 長方形を描画します。始点を左上隅にして、計算された幅と高さを使用します。
        // 長方形の位置が1ピクセルずれないように、始点の座標から1を引いてオフセットします
        this._ctx.fillRect(this._settings.x - 1, this._settings.y - 1, _width, _height);

        // TODO: ハイライト表示に対応

        // 他の図形に影響を与えないように、描画後に変換をリセットします
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    public override isPointInside(x: number, y: number): boolean {
        /*
            【Chat-GPT】
            四角形は幅を持つので、クリック位置が四角形の境界内にあるかを判定します。
            具体的には、四角形の頂点とクリック位置の距離を計算し、どれかの辺との距離が0より小さく、かつ全ての辺との距離が四角形の幅以下であれば、クリック位置が四角形内にあると判定します。
        */
        const left = this._settings.x;
        const right = this._settings.x + this._settings.width;
        const top = this._settings.y;
        const bottom = this._settings.y + this._settings.height;

        const distanceLeft = Math.abs(x - left);
        const distanceRight = Math.abs(x - right);
        const distanceTop = Math.abs(y - top);
        const distanceBottom = Math.abs(y - bottom);

        const minDistanceX = Math.min(distanceLeft, distanceRight);
        const minDistanceY = Math.min(distanceTop, distanceBottom);

        return minDistanceX <= this._settings.width && minDistanceY <= this._settings.height;
    }
    public constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
    }
}

// 図形：直線
export class Line_2 extends Shape_2 {
    public redraw(): void {
        /*
            【Chat-GPT】
            直線 (Line) を描画するには、HTML5のCanvas要素を使用して、CanvasRenderingContext2Dのメソッドを呼び出します。直線は、moveTo()とlineTo()メソッドを使って2つの座標を結びます。

            draw()メソッドの中で行っていることは以下の通りです：

            1. ctx.beginPath()：新しいパスを開始します。
            2. ctx.moveTo(this.x, this.y)：直線の始点を設定します。
            3. ctx.lineTo(endX, endY)：直線の終点を設定します。
            4. ctx.strokeStyle：線の色を設定します。this.colorはShapeクラスで管理されている線の色です。
            5. ctx.lineWidth：線の太さを設定します。isSelectedがtrueの場合は3、そうでない場合は1を使用しています。これにより、選択された直線をハイライト表示します。
            6. ctx.stroke()：線を実際に描画します。

            このように、draw()メソッドを使用して直線を描画することができます。CanvasRenderingContext2Dの他のメソッドを使って、直線のスタイルやエフェクトをカスタマイズすることも可能です。
        */
        this._ctx.beginPath();

        // 線の始点
        this._ctx.moveTo(this._settings.x, this._settings.y);

        // 線の終点
        const endX = this._settings.x + this._settings.width;
        const endY = this._settings.y + this._settings.height;
        this._ctx.lineTo(endX, endY);

        // 線のスタイル
        this._ctx.strokeStyle = this._settings.color;
        this._ctx.lineWidth = this._settings.isHighlight ? 3 : 1;

        // 線を描画
        this._ctx.stroke();
    }
    public isPointInside(x: number, y: number): boolean {
        /*
            【Chat-GPT】
            直線は幅を持たないため、クリック位置が直線上にあるかどうかを判定します。直線の幅が0なので、線分の近傍にあるかどうかを判定すれば良いです。

            Lineがx, y, width, heightを持つ場合、直線の位置や向きを表現することはできませんが、代わりに以下のような方法でisPointInside(x, y)を実装できます

            この実装では、点 (x, y) から直線に引いた垂線の長さを求めることで、点が直線上に存在するかを判定しています。具体的には、点 (x, y) と直線の両端を結ぶベクトルと直線自体のベクトルとの内積を求め、それを直線の長さの二乗で割った値 t を計算します。この t の値が [0, 1] の範囲内にあれば、点 (x, y) は直線上に存在すると判定します。

            ただし、この実装は直線の幅を考慮していないため、実際には点と直線との距離が幅の範囲内にあるかどうかを判定する必要があります。直線の幅を考慮する場合、より複雑な判定方法を採用する必要があるかもしれません。その場合はプロジェクトの要件に合わせて適切な判定方法を選択してください。
        */

        // 点 (x, y) から直線までの垂線の長さを求める
        const dx = this._settings.width;
        const dy = this._settings.height;

        const lengthSquared = dx * dx + dy * dy;
        const t = ((x - this._settings.x) * dx + (y - this._settings.y) * dy) / lengthSquared;

        // 垂線が直線上にあるかを判定
        // t の値が [0, 1] の範囲内であれば点 (x, y) は直線上に存在する
        return t >= 0 && t <= 1;
    }
    public constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
    }
}