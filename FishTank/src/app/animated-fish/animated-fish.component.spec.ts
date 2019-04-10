import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedFishComponent } from './animated-fish.component';

describe('AnimatedFishComponent', () => {
  let component: AnimatedFishComponent;
  let fixture: ComponentFixture<AnimatedFishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedFishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedFishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
