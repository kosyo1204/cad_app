export class CommandManager {
  // コマンドの実行履歴を管理する配列
  private history: Command[] = [];
  // undo/redo用のスタック
  private redoStack: Command[] = [];

  execute(command: Command): void {
    command.execute();
    // 実行したコマンドをhistory配列に追加
    this.history.push(command);
    // 新しいコマンドが実行された時にredoの履歴を破棄
    this.redoStack = [];
  }

  undo(): void {
    // 最後に実行したコマンドを取り出す
    const command = this.history.pop();
    // コマンドがあれば実行
    if (command) {
      command.undo();
      this.redoStack.push(command);
    }
  }

  redo(): void {
    const command = this.redoStack.pop();
    if (command) {
      command.execute();
      this.history.push(command);
    }
  }
}
