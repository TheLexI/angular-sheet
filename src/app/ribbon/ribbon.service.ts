import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RibbonService {

  width = 100;
  heigth = 100;

  states$: Subject<{ [key: string]: any }> = new Subject();

  states = {};

  constructor() {
    this.states$.subscribe((a: { [key: string]: any }) => {
      this.states = { ...this.states, ...a };
    });
  }

  inject(el){}
}
