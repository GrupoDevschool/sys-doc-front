import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusTagComponent } from './status-tag.component';

describe('StatusTagComponent', () => {
  let component: StatusTagComponent;
  let fixture: ComponentFixture<StatusTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
