import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenDescriptionComponent } from './screen-description.component';

describe('ScreenDescriptionComponent', () => {
  let component: ScreenDescriptionComponent;
  let fixture: ComponentFixture<ScreenDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
