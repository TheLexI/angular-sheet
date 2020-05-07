import { Injectable } from '@angular/core';
import { BorderDto } from './page/dto/border-dto';
import { DataDto } from './page/dto/data-dto';
import { Subject } from 'rxjs';
import { TopologeDto } from './page/dto/topologe-dto';
import { Commands } from '../commands.enum';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  public topologe$ = new Subject<TopologeDto[]>();

  topologe: TopologeDto[][] = [];
  borders: BorderDto[][] = [];
  data: DataDto[][] = [];


  makeData$ = new Subject();
  makeBorder$ = new Subject();
  command$ = new Subject<{ [name: string]: any }>();

  constructor() {

    this.command$.subscribe(cmd => {
      /*Object.keys(cmd).forEach(key => {
        switch (String(key)) {
          case String(Commands.EditMergeCell):
            const topologe = this.getTopologe();
            if (cmd[key]) {
              topologe.merge();
            } else {
              topologe.split();
            }
            break;
        }
      });*/
    });

    this.makeData$.subscribe(() => {
     // const topologe = this.getTopologe();
      /*const topologe.activeData()*/
    });
  }

  /*getTopologe() {
    if (!(this.topologe[this.cursor.left] && this.topologe[this.cursor.left][this.cursor.top])) {
      this.topologe[this.cursor.left] = this.topologe[this.cursor.left] || [];
      this.topologe[this.cursor.left][this.cursor.top] = new TopologeDto(this);
      this.topologe$.next(
        this.topologe.reduce((c: TopologeDto[], a: TopologeDto[]) => c.concat(a), []).filter(a => a instanceof TopologeDto)
      );
    }
    return this.topologe[this.cursor.left][this.cursor.top];
  }*/
}
