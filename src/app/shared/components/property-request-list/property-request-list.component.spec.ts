import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyRequestListComponent } from './property-request-list.component';

describe('PropertyRequestListComponent', () => {
  let component: PropertyRequestListComponent;
  let fixture: ComponentFixture<PropertyRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
