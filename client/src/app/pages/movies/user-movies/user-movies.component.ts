import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/Movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-user-movies',
  templateUrl: './user-movies.component.html',
  styleUrls: ['./user-movies.component.css'],
})
export class UserMoviesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.findAllByUser().subscribe((response) => {
      if (
        response &&
        response.status &&
        response.status === 200 &&
        response.data
      ) {
        this.movies = response.data;
      }
    });
  }
}
