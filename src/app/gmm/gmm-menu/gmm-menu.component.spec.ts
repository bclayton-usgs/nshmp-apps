import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmmMenuComponent } from './gmm-menu.component';

describe('GmmMenuComponent', () => {
  let component: GmmMenuComponent;
  let fixture: ComponentFixture<GmmMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmmMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmmMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
