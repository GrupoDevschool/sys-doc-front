import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTypeFormComponent } from './event-type-form.component';

describe('EventTypeFormComponent', () => {
  let component: EventTypeFormComponent;
  let fixture: ComponentFixture<EventTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
