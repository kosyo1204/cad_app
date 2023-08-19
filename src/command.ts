interface Command {
  execute(): void;
  undo(): void;
}

// コマンドの内容を実装する具象クラス
export class AddShapeCommand implements Command {
  private drawingArea: DrawingArea;
  constructor(drawingArea: DrawingArea) {
    this.drawingArea = drawingArea;
  }
  execute() {
    this.drawingArea.addShape();
  }
  undo(){};
}

// コマンドの内容を実装する具象クラス
export class RemoveShapeCommand implements Command {
  private drawingArea: DrawingArea;
  constructor(drawingArea: DrawingArea) {
    this.drawingArea = drawingArea;
  }
  execute() {
    this.drawingArea.removeShape();
  }
  undo(){};
}

export class DrawingArea {
  // コマンドを受ける対象に実装されたメソッドは具象クラスから呼び出す
  addShape() {
    console.log('addShape');
  }
  removeShape() {
    console.log('removeShape');
  }
}

class CommandManager {
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

export class CAD {
  private readonly _addShapeButton : HTMLButtonElement;
  private readonly _removeShapeButton : HTMLButtonElement;
  private readonly _undoButton : HTMLButtonElement;
  private readonly _redoButton : HTMLButtonElement;
  private commandManager: CommandManager;

  constructor(document: Document) {
    this._addShapeButton = document.getElementById('addShapeButton') as HTMLButtonElement;
    this._removeShapeButton = document.getElementById('removeShapeButton') as HTMLButtonElement;
    this._undoButton = document.getElementById('undoButton') as HTMLButtonElement;
    this._redoButton = document.getElementById('redoButton') as HTMLButtonElement;

    this.commandManager = new CommandManager();

    this._addShapeButton.addEventListener('click', () => {
      const drawingArea = new DrawingArea();
      const addShapeCommand = new AddShapeCommand(drawingArea);
      this.commandManager.execute(addShapeCommand);
    });

    this._removeShapeButton.addEventListener('click', () => {
      const drawingArea = new DrawingArea();
      const removeShapeCommand = new RemoveShapeCommand(drawingArea);
      this.commandManager.execute(removeShapeCommand);
    });

    this._undoButton.addEventListener('click', () => {
      this.commandManager.undo();
    });

    this._redoButton.addEventListener('click', () => {
      this.commandManager.redo();
    });
  }
}
