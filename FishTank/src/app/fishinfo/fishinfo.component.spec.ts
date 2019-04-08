import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FishinfoComponent } from './fishinfo.component';

describe('FishinfoComponent', () => {
  let component: FishinfoComponent;
  let fixture: ComponentFixture<FishinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FishinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FishinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
