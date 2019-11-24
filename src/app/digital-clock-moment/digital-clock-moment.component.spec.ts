import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalClockMomentComponent } from './digital-clock-moment.component';

describe('DigitalClockMomentComponent', () => {
  let component: DigitalClockMomentComponent;
  let fixture: ComponentFixture<DigitalClockMomentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalClockMomentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalClockMomentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
