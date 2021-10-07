import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRequestPropertyComponent } from './event-request-property.component';

describe('EventRequestPropertyComponent', () => {
  let component: EventRequestPropertyComponent;
  let fixture: ComponentFixture<EventRequestPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventRequestPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRequestPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
