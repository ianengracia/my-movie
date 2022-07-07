import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/Movie';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-movies',
  templateUrl: './user-movies.component.html',
  styleUrls: ['./user-movies.component.css'],
})
export class UserMoviesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private userService: UserService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('My Movies | MyMoviesSite');
  }

  ngOnInit(): void {
    this.movieService.findAllByUser().subscribe((response) => {
      if (response?.status === 403) {
        this.userService.deleteToken();
        this.router.navigateByUrl('/login');
        return;
      }

      if (response?.status === 200 && response.data) {
        this.movies = response.data;
      }
    });
  }
}
