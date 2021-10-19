import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-spinner',
  templateUrl: './table-spinner.component.html',
  styleUrls: ['./table-spinner.component.scss']
})
export class TableSpinnerComponent {

  @Input() loading?: boolean = false;
  @Input() spinnerColor?: string = 'primary';

  @Input() class?: string;
}
