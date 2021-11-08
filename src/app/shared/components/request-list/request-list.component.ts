import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'src/app/shared/model/Request';
import { RequestService } from '../../services/request/request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss'],
})
export class RequestListComponent implements OnInit {
  @Input() eventId?: number;
  requests$?: Observable<Request[]>;

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    if (this.eventId) {
      this.requests$ = this.requestService.getAllbyEventId(this.eventId).pipe(
        map(requests =>
          requests.filter(request => request.status)
          .sort((a, b) => a.order - b.order)
        )
      );
    }
  }
}
