import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-spinner-button',
  templateUrl: './spinner-button.component.html',
  styleUrls: ['./spinner-button.component.scss']
})
export class SpinnerButtonComponent {

  @Input() type: string = 'button';
  @Input() loading?: boolean = false;
  @Input() disabled?: boolean | null  = false;

  @Input() color?: string = 'primary';
  @Input() spinnerColor?: string = 'primary';
  @Input() fullWidth?: boolean = false;
  @Input() borderRadius?: string = '0px';
  @Input() diameter?: number = 20;

  @Input() class?: string;

  @Input() tooltipMessage: string = 'Existem campos não preenchidos corretamente';

  @Output() public action:EventEmitter<any> = new EventEmitter();
}
