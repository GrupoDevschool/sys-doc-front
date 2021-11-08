import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestProperty } from '../../model/RequestProperty';
import { RequestPropertyService } from '../../services/request-property/request-property.service';

@Component({
  selector: 'app-property-request-list',
  templateUrl: './property-request-list.component.html',
  styleUrls: ['./property-request-list.component.scss'],
})
export class PropertyRequestListComponent implements OnInit {
  @Input() requestId?: number;
  requestProperties$!: Observable<RequestProperty[]>;

  constructor(private requestPropertyService: RequestPropertyService) {}

  ngOnInit(): void {
    if (this.requestId) {
      this.requestProperties$ = this.requestPropertyService.getAllByRequestId(this.requestId);
    }
  }
}
