import { Component, Input, OnInit } from '@angular/core';
import { RequestProperty } from '../../model/RequestProperty';
import { RequestPropertyService } from '../../services/request-property/request-property.service';

@Component({
  selector: 'app-property-request-list',
  templateUrl: './property-request-list.component.html',
  styleUrls: ['./property-request-list.component.scss'],
})
export class PropertyRequestListComponent implements OnInit {
  @Input() requestId?: number;
  requestPropertys?: RequestProperty[];

  constructor(private requestPropertyService: RequestPropertyService) {}

  ngOnInit(): void {
    if (this.requestId) {
      this.requestPropertyService
        .getAllByRequestId(this.requestId)
        .subscribe((properties) => {
          this.requestPropertys = properties;
        });
    }
  }
}
