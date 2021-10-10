import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-spinner-button',
  templateUrl: './spinner-button.component.html',
  styleUrls: ['./spinner-button.component.scss']
})
export class SpinnerButtonComponent {

  @Input() type: string = 'button';
  @Input() text: string = 'Cadastrar';
  @Input() loading?: boolean = false;
  @Input() color?: string = 'primary';
  @Input() class?: string;
  @Input() spinnerColor?: string = 'primary';
  @Input() diameter?: number = 20;
  @Input() fullWidth?: boolean = false;
  @Input() borderRadius?: string = '0px';
  @Input() disabled?: boolean | null  = false;
  @Input() tooltipMessage: string = 'Existem campos não preenchidos corretamente';

  @Output() public action:EventEmitter<any> = new EventEmitter();
}
