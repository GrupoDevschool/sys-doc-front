import { Component, OnInit, Input } from '@angular/core';
import { Screen } from '../../model/Screen';

@Component({
  selector: 'app-screen-carousel',
  templateUrl: './screen-carousel.component.html',
  styleUrls: ['./screen-carousel.component.scss'],
})
export class ScreenCarouselComponent implements OnInit {
  @Input() screens?: Screen[];

  constructor() {}

  ngOnInit(): void {}
}
