import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { CursorDirective } from './page/cursor.directive';

@NgModule({
  declarations: [PageComponent, CursorDirective],
  imports: [
    CommonModule
  ],
  exports: [PageComponent]
})
export class SheetModule { }
