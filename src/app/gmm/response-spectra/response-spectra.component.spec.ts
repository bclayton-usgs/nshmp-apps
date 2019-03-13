import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseSpectraComponent } from './response-spectra.component';

describe('ResponseSpectraComponent', () => {
  let component: ResponseSpectraComponent;
  let fixture: ComponentFixture<ResponseSpectraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseSpectraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseSpectraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
