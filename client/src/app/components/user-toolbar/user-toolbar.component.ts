import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-toolbar',
  templateUrl: './user-toolbar.component.html',
  styleUrls: ['./user-toolbar.component.css'],
})
export class UserToolbarComponent implements OnInit {
  @Input() user: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onClick(): void {
    this.userService.deleteToken();
    this.userService.logoutUser();
    this.router.navigateByUrl('/');
  }
}
