import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenFormComponent } from './screen-form.component';

describe('ScreenFormComponent', () => {
  let component: ScreenFormComponent;
  let fixture: ComponentFixture<ScreenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
