import { Component, OnInit, Input, ElementRef, HostListener, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { OptionComponent } from './option/option.component';
import { RibbonService } from '../../ribbon.service';
import { filter, startWith, map, pairwise } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ribbon-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, AfterContentInit {
  @Input() command = undefined;

  value = null;
  name = new Subject();
  items: OptionComponent[] = [];
  hidden = true;
  state = null;

  @HostListener('document:click', ['$event']) hide(evt: MouseEvent) {
    if (!this.ref.nativeElement.contains(evt.target)) {
      this.hidden = true;
    }
  }

  constructor(
    private ref: ElementRef,
    private ribbonService: RibbonService,
    private detector: ChangeDetectorRef

  ) {
    this.ribbonService.states$.pipe(
      filter((a: { [name: string]: any }) => String(this.command) in a),
      startWith({}),
      map(a => a[String(this.command)] || false),
      pairwise(),
      filter(([a, b]) => a !== b),
      map(([a, b]) => b)
    ).subscribe(b => {
      this.state = b;
      const activeItem = this.items.find(a => a.payload === this.state);
      if (activeItem) {
        this.value = activeItem.payload;
        this.name.next(activeItem.ref.nativeElement.innerText || activeItem.ref.nativeElement.innerHTML);
        detector.detectChanges();
      }
    });
  }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    const activeItem = this.items.find(a => a.payload === this.state);
    if (activeItem) {
      this.value = activeItem.payload;
      this.name.next(activeItem.ref.nativeElement.innerText || activeItem.ref.nativeElement.innerHTML);
      this.detector.detectChanges();
    }
  }

  addItem(item: OptionComponent) {
    console.log('itm');
    this.items.push(item);
  }

  setValue(value: { name: string, value: any }) {
    this.value = value;
    this.ribbonService.states$.next({ [this.command]: value.value });
  }
}
