import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Movie } from 'src/app/interfaces/Movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css'],
})
export class AllMoviesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private titleService: Title) {
    this.titleService.setTitle('MyMoviesSite');
  }

  ngOnInit(): void {
    this.movieService.findAll().subscribe((response) => {
      if (response?.status === 200 && response.data) {
        this.movies = response.data;
      }
    });
  }
}
