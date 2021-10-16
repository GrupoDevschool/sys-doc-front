import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  opened: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  toggle(): void {
    this.opened = !this.opened;
  }
  ngOnInit(): void {
  }

}
