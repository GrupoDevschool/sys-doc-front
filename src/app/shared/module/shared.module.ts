import { ScreenCarouselComponent } from './../components/screen-carousel/screen-carousel.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PropertyRequestListComponent } from '../components/property-request-list/property-request-list.component';
import { RequestListComponent } from '../components/request-list/request-list.component';
import { StatusTagComponent } from '../components/status-tag/status-tag.component';
import { TableSpinnerComponent } from '../components/table-spinner/table-spinner.component';
import { MensagemComponent } from './../components/mensagem/mensagem.component';
import { SpinnerButtonComponent } from './../components/spinner-button/spinner-button.component';
import { MaterialCommonModule } from './material.module';

@NgModule({
  imports: [CommonModule, MaterialCommonModule],
  declarations: [
    MensagemComponent,
    SpinnerButtonComponent,
    TableSpinnerComponent,
    StatusTagComponent,
    PropertyRequestListComponent,
    RequestListComponent,
    ScreenCarouselComponent,
  ],
  exports: [
    MensagemComponent,
    SpinnerButtonComponent,
    TableSpinnerComponent,
    StatusTagComponent,
    PropertyRequestListComponent,
    RequestListComponent,
    ScreenCarouselComponent,
  ],
})
export class SharedModule {}
