import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EventType } from 'src/app/shared/model/EventType';
import { EventTypeService } from 'src/app/shared/services/event-type/event-type.service';

@Component({
  selector: 'app-event-type',
  templateUrl: './event-type.component.html',
  styleUrls: ['./event-type.component.scss'],
})
export class EventTypeComponent implements OnInit {
  dataSource!: MatTableDataSource<EventType>;
  displayedColumns: string[] = ['id', 'name', 'status', 'actions'];
  selection = new SelectionModel<string>(true, []);

  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private eventTypeService: EventTypeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.loading = true;
    this.eventTypeService.getAll().subscribe((eventTypes) => {
      this.dataSource = new MatTableDataSource(eventTypes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.loading = false;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id: number) {
    this.eventTypeService.delete(id).subscribe(() => {
      this.reloadData();
    });
  }

  edit(eventType: EventType) {
    this.router.navigate(['dashboard/project/add'], { state: eventType });
  }
}
