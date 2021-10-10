import { NgModule } from "@angular/core";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';


export const MODULES = [
  MatButtonModule,
  MatSidenavModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatTableModule,
  MatBadgeModule,
  MatAutocompleteModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatTooltipModule
]


@NgModule({
  exports: [
    ...MODULES
  ],
  declarations: []
})
export class MaterialCommonModule { }
