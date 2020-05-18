import { TextComponent } from './text/text.component';
import { Type } from '@angular/core';
import { FloorComponent } from './floor/floor.component';
import { RoomComponent } from './room/room.component';
import { PortComponent } from './port/port.component';

export enum Control {
  TextComponent,
  FloorComponent,
  PortComponent,
  RoomComponent,
}

export class Controls {
  static getComponent(type: string): Type<any> {
    switch (Control[type]) {
      case Control.TextComponent:
        return TextComponent;
      case Control.FloorComponent:
        return FloorComponent;
      case Control.PortComponent:
        return PortComponent;
      case Control.RoomComponent:
        return RoomComponent;
      default:
        return TextComponent;
    }
  }
}
