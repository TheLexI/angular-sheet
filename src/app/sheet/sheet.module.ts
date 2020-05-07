import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { TopologeDirective } from './page/topologe.directive';
import { TextComponent } from './controls/text/text.component';
import { CursorComponent } from './page/cursor/cursor.component';
import { ComponentDirective } from './page/cursor/component.directive';
import { TopologeComponent } from './page/topologe/topologe.component';

@NgModule({
  declarations: [PageComponent, TopologeDirective, TextComponent, CursorComponent, ComponentDirective, TopologeComponent],
  imports: [
    CommonModule
  ],
  exports: [PageComponent],
  entryComponents: [CursorComponent, TextComponent]
})
export class SheetModule { }
