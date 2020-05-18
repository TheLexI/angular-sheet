import { Injectable } from '@angular/core';
import { BorderDto } from './page/dto/border-dto';
import { DataDto } from './page/dto/data-dto';
import { Subject } from 'rxjs';
import { TopologeDto } from './page/dto/topologe-dto';
import { Commands } from '../commands.enum';
import { SheetService } from './sheet.service';
import { Control } from './controls/controls';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  sheetService: SheetService;
  public topologe$ = new Subject<TopologeDto[]>();
  public activeTopologe$ = new Subject();

  topologe: TopologeDto[][] = [];
  borders: BorderDto[][] = [];
  data: DataDto[][] = [];


  makeData$ = new Subject();
  makeBorder$ = new Subject();
  command$ = new Subject<{ [name: string]: any }>();

  inject(pageComponent: any) {
    this.sheetService = pageComponent.sheetService;
  }

  constructor(

  ) {

    this.activeTopologe$.subscribe(console.log);

    this.command$.subscribe(cmd => {
      Object.keys(cmd).forEach(key => {
        switch (String(key)) {
          case String(Commands.AddFloor):
            if (this.sheetService.cursors[0].ref.getTopologe().size === 0) {
              this.sheetService.cursors[0].ref.createTopologe(Control[Control.FloorComponent]);
            }
            break;
            case String(Commands.AddPort):
              if (this.sheetService.cursors[0].ref.getTopologe().size === 0) {
                this.sheetService.cursors[0].ref.createTopologe(Control[Control.PortComponent]);
              }
              break;
          }
      });
    });

    this.makeData$.subscribe(() => {
      const topologes = this.sheetService.cursors[0].ref.getTopologe();
      const topologe = (topologes.size === 0)
        ? this.sheetService.cursors[0].ref.createTopologe()
        : topologes.values[0];

      this.activeTopologe$.next(topologe);
    });
  }
}
