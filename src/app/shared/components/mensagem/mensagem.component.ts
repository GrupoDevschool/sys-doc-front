import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.scss']
})
export class MensagemComponent implements OnInit {
  constructor() { }

  @Input() class?: string;

  ngOnInit(): void {
  }

}
