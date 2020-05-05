import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { CellLeftComponent } from './page/interfaces/cell-left/cell-left.component';



@NgModule({
  declarations: [PageComponent, CellLeftComponent],
  imports: [
    CommonModule
  ],
  exports: [PageComponent]
})
export class SheetModule { }
