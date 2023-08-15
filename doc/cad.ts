// // TVの例で考える
// interface Command {
//   execute(): void;
// }

// // コマンドの内容を実装する具象クラス
// class DrawCommand implements Command {
//   private area: Area;
//   constructor(area: Area) {
//     this.area = area;
//   }

//   execute() {
//     this.area.draw();
//   }
// }

// class Area {
//   // コマンドを受ける対象に実装されたメソッドは具象クラスから呼び出す
//   draw(){
//     console.log('draw');
//   }
// }

// class CAD {
//   private command: Command;

//   setCommand(command: Command) {
//     this.command = command;
//   }

//   mouseMove() {
//     this.command.execute();
//   }
// }

// /*
// 1.受信者のインスタンスを生成
// 2.受信者のインスタンスを引数としてコマンドを実行する具象クラスのインスタンスを生成
// 3.コマンドを実行するクラスのインスタンスを生成
// 4.コマンド実行インスタンスを引数に、コマンド実行インスタンスのコマンド設定メソッドを呼び出し
// 5.コマンドを実行
// */
// const area = new Area();
// const drawCommand = new DrawCommand(area);
// const cad = new CAD();
// cad.setCommand(drawCommand);
// cad.mouseMove();