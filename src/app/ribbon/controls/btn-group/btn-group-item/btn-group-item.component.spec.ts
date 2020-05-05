import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnGroupItemComponent } from './btn-group-item.component';

describe('BtnGroupItemComponent', () => {
  let component: BtnGroupItemComponent;
  let fixture: ComponentFixture<BtnGroupItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnGroupItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnGroupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
