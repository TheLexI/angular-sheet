import { CellLeft } from './cell-left';
import { CellTop } from './cell-top';
import { CellWidth } from './cell-width';
import { CellHeight } from './cell-height';
export interface RowInteface {
  colId: number;
  rowId: number;

  prew: RowInteface;
  next: RowInteface;

  left: CellLeft;
  top: CellTop;
  width: CellWidth;
  height: CellHeight;

}

