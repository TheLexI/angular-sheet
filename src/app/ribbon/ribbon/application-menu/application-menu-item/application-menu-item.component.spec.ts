import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationMenuItemComponent } from './application-menu-item.component';

describe('ApplicationMenuItemComponent', () => {
  let component: ApplicationMenuItemComponent;
  let fixture: ComponentFixture<ApplicationMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
