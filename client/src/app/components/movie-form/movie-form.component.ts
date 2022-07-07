import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';

import { GENRES } from '../../config/genres';
import { COUNTRIES } from '../../config/countries';

import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Movie } from 'src/app/interfaces/Movie';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
})
export class MovieFormComponent implements OnInit {
  id!: number;
  title: string = '';
  releaseDate: string = '';
  runtime: string = '';
  country: string = '';
  genre: string = '';
  production: string = '';
  director: string = '';
  cast: string = '';
  poster: string = '';
  summary: string = '';

  genres = GENRES;
  countries = COUNTRIES;

  selectedGenre: any = new Set();
  errors: any = {};
  faUploadIcon = faUpload;

  user: any = {};
  userSubscription: Subscription;

  movieId!: number;
  movie!: Movie;

  constructor(
    private userService: UserService,
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    this.titleService.setTitle('New Movie | MyMoviesSite');

    this.userSubscription = this.userService
      .onLoadUser()
      .subscribe((value) => (this.user = value));

    if (!this.user.id) this.user = this.userService.getUser();
  }

  ngOnInit(): void {
    const isUpdateMovie = this.checkWhichRoute('/movies/update');

    if (!isUpdateMovie) return;

    this.route.queryParams.subscribe((params) => {
      this.movieId = params['id'];
    });

    if (!this.movieId || this.movieId === undefined) {
      this.router.navigateByUrl('/movies/my-movies');
    }

    this.movieService.findById(this.movieId).subscribe((response) => {
      if (response?.status === 200 && response.data) {
        this.movie = response.data;
        this.checkIfMoveOwnedByUser();
        this.setMovieData();

        this.titleService.setTitle(`${this.movie.title} | MyMoviesSite`);

        return;
      }

      this.router.navigateByUrl('/movies/my-movies');
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onPosterImageChange($event: any): void {
    const fileInput = $event.target;

    if (fileInput.files && fileInput.files[0]) {
      var reader = new FileReader();

      reader.onload = (e: any) => {
        const base64Image = e.target.result;

        this.poster = base64Image;
      };

      reader.readAsDataURL(fileInput.files[0]);

      return;
    }
  }

  onSelectGenre($event: any): void {
    const isChecked = $event.target.checked;
    const value = $event.target.value;

    if (isChecked) this.selectedGenre.add(value);
    else this.selectedGenre.delete(value);

    this.genre = Array.from(this.selectedGenre).join(', ');
  }

  isGenreSelected(g: string): boolean {
    return this.selectedGenre.has(g);
  }

  onSubmit(): void {
    const isValid: boolean = this.validateForm();

    if (!isValid) return;

    const newMovie = this.createMovie();

    const isUpdateMovie = this.checkWhichRoute('/movies/update');

    const toDo = isUpdateMovie ? 'UPDATE' : 'NEW';

    this.movieService.saveMovie(newMovie, toDo).subscribe((response) => {
      if (response?.status === 403) {
        this.userService.deleteToken();
        this.router.navigateByUrl('/login');
        return;
      }

      if (response?.status === 200 && response.data) {
        const movie = response.data;
        this.router.navigateByUrl(`/movies/details?id=${movie.id}`);
        return;
      }

      console.error('Error: ', response.message);
    });
  }

  checkWhichRoute(path: string) {
    return this.router.url.includes(path);
  }

  checkIfMoveOwnedByUser(): void {
    const isMovieOwnedByUser = this.user.id === this.movie.user.id;

    if (!isMovieOwnedByUser) this.router.navigateByUrl('/movies/my-movies');
  }

  validateForm(): boolean {
    const errors: any = {};

    //title
    if (!this.title.trim()) errors['title'] = true;

    //release date
    if (!this.releaseDate.trim()) errors['releaseDate'] = true;

    //runtime
    if (!this.runtime) errors['runtime'] = true;

    //runtime format
    if (this.runtime && isNaN(Number(this.runtime)))
      errors['runtimeFormat'] = true;

    //country
    if (!this.country.trim()) errors['country'] = true;

    //director
    if (!this.director.trim()) errors['director'] = true;

    //cast
    if (!this.cast.trim()) errors['cast'] = true;

    //production
    if (!this.production.trim()) errors['production'] = true;

    //summary
    if (!this.summary.trim()) errors['summary'] = true;

    //poster
    if (!this.poster.trim()) errors['poster'] = true;

    //genre
    if (!this.genre.trim()) errors['genre'] = true;

    this.errors = errors;

    return Object.keys(this.errors).length <= 0;
  }

  createMovie(): Movie {
    return {
      id: this.movie?.id,
      title: this.title,
      releaseDate: this.releaseDate,
      runtime: this.runtime,
      country: this.country,
      genre: this.genre,
      production: this.production,
      director: this.director,
      cast: this.cast,
      poster: this.poster,
      summary: this.summary,
      user: this.user,
    };
  }

  setMovieData(): void {
    this.title = this.movie.title;
    this.releaseDate = this.movie.releaseDate.split('T')[0];
    this.runtime = this.movie.runtime;
    this.country = this.movie.country;
    this.director = this.movie.director;
    this.cast = this.movie.cast;
    this.production = this.movie.production;
    this.summary = this.movie.summary;
    this.poster = this.movie.poster;
    this.genre = this.movie.genre;

    this.genre.split(',').forEach((g) => {
      this.selectedGenre.add(g.trim());
    });
  }
}
