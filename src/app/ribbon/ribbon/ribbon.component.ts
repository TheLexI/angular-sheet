import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RibbonService } from '../ribbon.service';

@Component({
  selector: 'ribbon',
  templateUrl: './ribbon.component.html',
  styleUrls: ['./ribbon.component.scss']
})
export class RibbonComponent implements OnInit {
  /**
   * Обработать корневые элементы:
   * ribbon-application-menu
   * quick-access-tool-bar
   * ribbon-tab
   */

  @Output() command = new EventEmitter<any>();


  activeTab = new BehaviorSubject(0);
  tabs: HTMLDivElement[] = [];
  constructor(
    private ribbonService: RibbonService,
    private ref: ElementRef
  ) {
    this.ribbonService.states$.subscribe(a => this.command.emit(a));
  }

  ngOnInit(): void {
    this.tabs = Array.from((this.ref.nativeElement as HTMLElement).querySelectorAll('ribbon-tab'));
    this.activeTab.subscribe(b => {
      this.tabs.forEach(a => a.classList.remove('active'));
      this.tabs[b].classList.add('active');
    });
  }

  active(index: number) {
    if (index !== this.activeTab.getValue()) {
      this.activeTab.next(index);
    }
  }

}
