import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Event, EventType, Screen } from 'src/app/shared/model';
import { EventTypeService } from 'src/app/shared/services/event-type/event-type.service';
import { EventService } from 'src/app/shared/services/event/event.service';

@Component({
  selector: 'app-screen-description',
  templateUrl: './screen-description.component.html',
  styleUrls: ['./screen-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScreenDescriptionComponent implements OnChanges {

  @Input() screenSelecionada!: Screen;
  events$!: Observable<Event[]>;
  eventTypes: EventType[] = [];
  loading = true;

  constructor(
    private eventService: EventService,
    private eventTypeService: EventTypeService
  ) { }

  ngOnChanges(): void {
    this.events$ = this.eventTypeService.getAll().pipe(
      switchMap(eventTypes => {
        this.eventTypes = eventTypes;
        return this.eventService.getByScreenId(this.screenSelecionada.id);
      })
    );
  }

  getEventTypeName(eventTypeId: number): string {
    if (this.eventTypes?.length) {
      const eventType = this.eventTypes.find(eventType => eventType.id === eventTypeId);
      return eventType?.name ?? '';
    }
    return '';
  }
}
