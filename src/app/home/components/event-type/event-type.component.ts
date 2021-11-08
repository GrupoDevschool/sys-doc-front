import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.loading = true;
    this.eventTypeService.getAll().subscribe((eventTypes) => {
      this.dataSource = new MatTableDataSource(eventTypes.sort((a,b) => a.name.localeCompare(b.name)));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error => {
      this.showError("Houve um erro ao carregar Tipos de Evento");
    }).add(() => this.loading = false);
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
      this.showSucess();
    },
    error => {
      if (error.status == 400) {
        this.showError("Não é possivel deletar um Tipo de Evento com Eventos cadastrados");
      } else {
        this.showError("Não foi possivel deletar o Tipo de Evento");
      }
    });
  }

  edit(eventType: EventType) {
    this.router.navigate(['dashboard/event-type/add'], { state: eventType });
  }

  showError(message: string) {
    this.toastr.error(message)
  }

  showSucess() {
    this.toastr.success("Tipo de Evento deletado com sucesso")
  }
}
