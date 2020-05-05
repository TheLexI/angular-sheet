import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SheetService {

  defaultWidth = 200;
  defaultHeight = 20;

  pageWidth = 100;
  pageHeight = 100;

  constructor() { }
}
