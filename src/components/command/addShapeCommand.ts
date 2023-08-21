import { Command } from './command';
import { DrawingArea } from '../drawingArea';

// コマンドの内容を実装する具象クラス
export class AddShapeCommand implements Command {
  private drawingArea: DrawingArea;
  constructor(drawingArea: DrawingArea) {
    this.drawingArea = drawingArea;
  }
  execute() {
    this.drawingArea.addShape();
  }
  undo(){
    this.drawingArea.removeShape();
  };
}