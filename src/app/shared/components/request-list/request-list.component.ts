import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
      console.log(this.eventId);
      this.requests$ = this.requestService.getAllbyEventId(this.eventId);
    }
  }
}
