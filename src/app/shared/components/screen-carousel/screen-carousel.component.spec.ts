import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenCarouselComponent } from './screen-carousel.component';

describe('ScreenCarouselComponent', () => {
  let component: ScreenCarouselComponent;
  let fixture: ComponentFixture<ScreenCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
