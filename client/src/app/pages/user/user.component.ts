import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  hasRoute(route: string) {
    return this.router.url === route;
  }
}
