import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/interfaces/Credentials';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  //error
  errorMsg: string = '';
  hasError: boolean = false;
  errors: any = {};

  constructor(
    private titleService: Title,
    private userService: UserService,
    private router: Router
  ) {
    this.titleService.setTitle('Login | MyMovies');
  }

  ngOnInit(): void {
    if (this.userService.checkUserLoggedIn()) this.router.navigateByUrl('/');
  }

  onSubmit(): void {
    this.initError();

    //validate username
    if (!this.username.trim()) {
      this.hasError = true;
      this.errors.username = true;
    }

    //validate password
    if (!this.password.trim()) {
      this.hasError = true;
      this.errors.password = true;
    }

    if (this.hasError) return;

    const credentials: Credentials = {
      username: this.username,
      password: this.password,
    };

    this.userService.login(credentials).subscribe((response) => {
      if (response && response.status && response.status === 200) {
        this.userService.setToken(response.data.token);
        this.userService.loadedUser(response.data.user);
        this.userService.loginUser();
        this.router.navigateByUrl('/movies/my-movies');
        return;
      }

      //show error if has any
      this.errorMsg = response.message || 'Something went wrong!';
    });
  }

  initError() {
    this.errorMsg = '';
    this.hasError = false;
    this.errors = {
      name: false,
      username: false,
      password: false,
    };
  }
}
