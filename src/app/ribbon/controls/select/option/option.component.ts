import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { SelectComponent } from '../select.component';

@Component({
  selector: 'ribbon-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
  @Input() payload = {};
  constructor(
    private selectRef: SelectComponent,
    public ref: ElementRef
  ) {
    this.selectRef.addItem(this);
  }

  ngOnInit(): void {
    //console.log(this.selectRef);
  }

}
