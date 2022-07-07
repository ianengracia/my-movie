import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/Movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css'],
})
export class AllMoviesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.findAll().subscribe((response) => {
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
