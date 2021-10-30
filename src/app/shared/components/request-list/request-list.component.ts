import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from '../../services/request/request.service';
import { Request } from 'src/app/shared/model/Request';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss'],
})
export class RequestListComponent implements OnInit {
  @Input() eventId?: number;
  requests?: Request[];

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    if (this.eventId) {
      this.requestService.getAllbyEventId(this.eventId).subscribe((request) => {
        this.requests = request;
      });
    }
  }
}
