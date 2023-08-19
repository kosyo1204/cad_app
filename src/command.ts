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
  execute(){}
  undo(){}
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
  private history: Command[] = [];
  private redoStack: Command[] = [];

  execute(command: Command): void {
    command.execute();
    this.history.push(command);
    this.redoStack = [];
  }

  undo(): void {
    const command = this.history.pop();
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
  private readonly _rectangleButton : HTMLButtonElement;
  private readonly _undoButton : HTMLButtonElement;
  private commandManager: CommandManager;

  constructor(document: Document) {
    this._rectangleButton = document.getElementById('rectangleButton') as HTMLButtonElement;
    this._undoButton = document.getElementById('undoButton') as HTMLButtonElement;

    this.commandManager = new CommandManager();

    this._rectangleButton.addEventListener('click', () => {
      const drawingArea = new DrawingArea();
      const addShapeCommand = new AddShapeCommand(drawingArea);
      this.commandManager.execute(addShapeCommand);
    });

    this._undoButton.addEventListener('click', () => {
      this.commandManager.undo();
      this.commandManager.redo();
    });
  }
}
