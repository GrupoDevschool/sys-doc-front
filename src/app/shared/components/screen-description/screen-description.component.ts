import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/shared/model/Event';
import { Screen } from 'src/app/shared/model/Screen';

@Component({
  selector: 'app-screen-description',
  templateUrl: './screen-description.component.html',
  styleUrls: ['./screen-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush  
})
export class ScreenDescriptionComponent implements OnInit {

  @Input() events!: Event[];
  @Input() screenSelecionada!: Screen;

  constructor() { }

  ngOnInit(): void {
  }

}
