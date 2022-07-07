import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  name: string = '';
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
    this.titleService.setTitle('Sign Up | MyMoviesSite');

    this.initError();
  }

  ngOnInit(): void {
    if (this.userService.checkUserLoggedIn()) this.router.navigateByUrl('/');
  }

  onSubmit(): void {
    this.initError();

    //validate name
    if (!this.name.trim()) {
      this.hasError = true;
      this.errors.name = true;
    }

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

    const newUser: User = {
      name: this.name,
      username: this.username,
      password: this.password,
    };

    this.userService.register(newUser).subscribe((response) => {
      //show error if has any
      if (response?.status !== 201) {
        this.errorMsg = response.message || 'Something went wrong!';
      } else {
        this.router.navigateByUrl('/login');
      }
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
