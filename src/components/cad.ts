import { CommandManager } from './command/commandManager';
import { AddShapeCommand } from './command/addShapeCommand';
import { RemoveShapeCommand } from './command/removeShapeCommnad';
import { DrawingArea } from './drawingArea';

export class CAD {
  private readonly _canvas : HTMLCanvasElement;
  private readonly _addShapeButton : HTMLButtonElement;
  private readonly _removeShapeButton : HTMLButtonElement;
  private readonly _undoButton : HTMLButtonElement;
  private readonly _redoButton : HTMLButtonElement;
  private commandManager: CommandManager;
  private drawingArea: DrawingArea;

  constructor(document: Document) {
    this._canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this._addShapeButton = document.getElementById('addShapeButton') as HTMLButtonElement;
    this._removeShapeButton = document.getElementById('removeShapeButton') as HTMLButtonElement;
    this._undoButton = document.getElementById('undoButton') as HTMLButtonElement;
    this._redoButton = document.getElementById('redoButton') as HTMLButtonElement;

    this.commandManager = new CommandManager();
    this.drawingArea = new DrawingArea(this._canvas);

    this._addShapeButton.addEventListener('click', () => {
      const addShapeCommand = new AddShapeCommand(this.drawingArea);
      this.commandManager.execute(addShapeCommand);
    });

    this._removeShapeButton.addEventListener('click', () => {
      const removeShapeCommand = new RemoveShapeCommand(this.drawingArea);
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
