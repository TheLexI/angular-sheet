import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { TextComponent } from './controls/text/text.component';
import { CursorComponent } from './page/cursor/cursor.component';
import { ComponentDirective } from './page/cursor/component.directive';
import { TopologeComponent } from './page/topologe/topologe.component';
import { ContentRefDirective } from './controls/content-ref.directive';
import { FloorComponent } from './controls/floor/floor.component';
import { PortComponent } from './controls/port/port.component';
import { RoomComponent } from './controls/room/room.component';

@NgModule({
  declarations: [PageComponent, TextComponent,
    CursorComponent, ComponentDirective,
    TopologeComponent, ContentRefDirective,
    FloorComponent, PortComponent, RoomComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [PageComponent],
  entryComponents: [CursorComponent, TextComponent, FloorComponent, PortComponent, RoomComponent]
})
export class SheetModule { }
