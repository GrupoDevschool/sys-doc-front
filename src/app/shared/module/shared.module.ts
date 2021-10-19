import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableSpinnerComponent } from '../components/table-spinner/table-spinner.component';
import { MensagemComponent } from './../components/mensagem/mensagem.component';
import { SpinnerButtonComponent } from './../components/spinner-button/spinner-button.component';
import { MaterialCommonModule } from './material.module';


@NgModule({
    imports: [
      CommonModule,
      MaterialCommonModule
    ],
    declarations: [
      MensagemComponent,
      SpinnerButtonComponent,
      TableSpinnerComponent
    ],
    exports: [
      MensagemComponent,
      SpinnerButtonComponent,
      TableSpinnerComponent
    ]
})
export class SharedModule {}
