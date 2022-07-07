import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  user: any = {};
  subscription: Subscription;

  constructor(private userService: UserService) {
    this.subscription = this.userService
      .onLoadUser()
      .subscribe((value) => (this.user = value));
  }

  ngOnInit(): void {}
}
