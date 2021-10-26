import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-status-tag',
  templateUrl: './status-tag.component.html',
  styleUrls: ['./status-tag.component.scss']
})
export class StatusTagComponent {
  status: string = '';

  @ViewChild('span') content!: ElementRef<HTMLSpanElement>;

  constructor() {
    setTimeout(() => {
      switch (this.content?.nativeElement?.innerHTML?.toLowerCase()) {
        case 'active':
        case 'ativo':
        case 'true':
          this.status = 'active';
          break;
        case 'inativo':
        case 'inactive':
          this.status = 'inactive';
          break;
      }
    }, 1);
  }
}
