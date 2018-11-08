import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WtPageComponent } from './wt-page.component';

describe('WtPageComponent', () => {
  let component: WtPageComponent;
  let fixture: ComponentFixture<WtPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WtPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WtPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
