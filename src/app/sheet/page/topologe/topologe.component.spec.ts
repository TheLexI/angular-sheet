import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopologeComponent } from './topologe.component';

describe('TopologeComponent', () => {
  let component: TopologeComponent;
  let fixture: ComponentFixture<TopologeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopologeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopologeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
