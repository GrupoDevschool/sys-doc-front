import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';

export const MODULES = [
  MatButtonModule,
  MatSidenavModule,
  MatCardModule
]


@NgModule({
  exports: [
    ...MODULES
  ],
  declarations: []
})
export class MaterialCommonModule { }
