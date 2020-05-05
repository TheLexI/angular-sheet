import { CellLeft } from './cell-left';
import { CellTop } from './cell-top';
import { CellWidth } from './cell-width';
import { CellHeight } from './cell-height';
export interface ColInterface {
  colId: number;
  rowId: number;

  prew: ColInterface;
  next: ColInterface;

  left: CellLeft;
  rigth: CellTop;
  width: CellWidth;
  height: CellHeight;

}

