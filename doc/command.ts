// // TVの例で考える
// interface Command {
//   execute(): void;
// }

// // コマンドの内容を実装する具象クラス
// class TVPowerOnCommand implements Command {
//   private tv: TV;
//   constructor(tv: TV) {
//     this.tv = tv;
//   }

//   execute() {
//     this.tv.powerOn2();
//   }
// }

// // コマンドの内容を実装する具象クラス
// class TVPowerOffCommand implements Command {
//   private tv: TV;
//   constructor(tv: TV) {
//     this.tv = tv;
//   }

//   execute() {
//     this.tv.powerOff();
//   }
// }

// class TV {
//   // コマンドを受ける対象に実装されたメソッドは具象クラスから呼び出す
//   powerOn2() {
//     console.log('on');
//   }

//   powerOff(){
//     console.log('off');
//   }
// }

// class RemoteControl {
//   private command: Command;

//   setCommand(command: Command) {
//     this.command = command;
//   }

//   pressButton() {
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
// const tv = new TV();
// const powerOnCommand = new TVPowerOnCommand(tv);
// const remote = new RemoteControl();
// remote.setCommand(powerOnCommand);
// remote.pressButton();

// const powerOffCommand = new TVPowerOffCommand(tv);
// remote.setCommand(powerOffCommand);
// remote.pressButton();