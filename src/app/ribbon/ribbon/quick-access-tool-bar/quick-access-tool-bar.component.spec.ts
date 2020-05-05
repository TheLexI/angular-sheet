import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickAccessToolBarComponent } from './quick-access-tool-bar.component';

describe('QuickAccessToolBarComponent', () => {
  let component: QuickAccessToolBarComponent;
  let fixture: ComponentFixture<QuickAccessToolBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickAccessToolBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickAccessToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
