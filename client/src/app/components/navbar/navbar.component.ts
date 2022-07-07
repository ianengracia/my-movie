import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isUserLoggedIn: boolean;
  isUserLoggedInSubscription: Subscription;

  user: any = {};
  userSubscription: Subscription;

  searchFor: string = '';
  faSearchIcon = faSearch;

  constructor(private userService: UserService, private router: Router) {
    this.isUserLoggedIn = userService.checkUserLoggedIn();

    this.isUserLoggedInSubscription = this.userService
      .onLoginUser()
      .subscribe((value) => (this.isUserLoggedIn = value));

    this.userSubscription = this.userService
      .onLoadUser()
      .subscribe((value) => (this.user = value));
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.isUserLoggedInSubscription.unsubscribe();
  }

  onSearchSubmit(): void {
    if (!this.searchFor.trim()) {
      this.searchFor = '';
      return;
    }

    this.router.navigateByUrl(`/movies/search?t=${this.searchFor}`);
  }
}
