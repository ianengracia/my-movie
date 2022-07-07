import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Movie } from 'src/app/interfaces/Movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.css'],
})
export class SearchMoviesComponent implements OnInit {
  movies: Movie[] = [];
  searchFor!: string;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchFor = params['t'];

      if (!this.searchFor || this.searchFor === undefined) {
        this.router.navigateByUrl('/movies');
      } else {
        this.searchMovies();

        this.titleService.setTitle(`Search '${this.searchFor}' | MyMoviesSite`);
      }
    });
  }

  searchMovies(): void {
    this.movieService.searchMovies(this.searchFor).subscribe((response) => {
      if (response?.status === 200 && response.data) {
        this.movies = response.data;
        return;
      }

      console.error('Error: ', response.message);
      this.movies = [];
    });
  }
}
