import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private titleService: Title
  ) {
    this.titleService.setTitle('MyMoviesSite');
  }

  ngOnInit(): void {
    this.userService.loadUser().subscribe((response) => {
      if (response?.status === 403) {
        this.userService.deleteToken();
        this.router.navigateByUrl('/login');
        return;
      }

      if (response?.status === 200) {
        this.userService.loadedUser(response.data);
      }
    });
  }
}
