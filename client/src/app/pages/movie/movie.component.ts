import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/Movie';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';

import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Rating } from 'src/app/interfaces/Rating';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  isLoading: boolean = true;
  isNotFound: boolean = false;

  isUserLoggedIn: boolean;
  isUserLoggedInSubscription: Subscription;

  user: any = {};
  userSubscription: Subscription;

  movieId!: number;
  movie!: Movie;
  userRating: Rating | undefined = undefined;
  showRating: any;

  isUserUploaded: boolean = false;

  faStarSolidIcon = faStar;
  faStarRegular = faStarRegular;

  constructor(
    private movieService: MovieService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.isUserLoggedIn = userService.checkUserLoggedIn();

    this.isUserLoggedInSubscription = this.userService
      .onLoginUser()
      .subscribe((value) => (this.isUserLoggedIn = value));

    this.userSubscription = this.userService
      .onLoadUser()
      .subscribe((value) => (this.user = value));

    if (!this.user.id) this.user = this.userService.getUser();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.movieId = params['id'];
    });

    if (!this.movieId || this.movieId === undefined) {
      this.router.navigateByUrl('/movies');
    }

    this.movieService.findById(this.movieId).subscribe((response) => {
      this.isLoading = false;

      if (response?.status === 403) {
        this.userService.deleteToken();
        this.router.navigateByUrl('/login');
        return;
      }

      if (response?.status === 200 && response.data) {
        this.movie = response.data;
        this.checkIfUserUploaded();
        this.setUserRating();
        return;
      }

      this.isNotFound = true;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.isUserLoggedInSubscription.unsubscribe();
  }

  setUserRating(): void {
    if (!this.isUserLoggedIn) return;

    const userId = this.user?.id;

    const rating = this.movie.ratings?.find((r) => r.userId === userId);

    this.userRating = rating;

    this.setShowRating();
  }

  setShowRating(): void {
    const rating = this.userRating?.rating || 0;

    const showRating = [...Array(10).keys()].map((ind) => {
      if (ind + 1 <= rating) {
        return {
          id: ind,
          icon: this.faStarSolidIcon,
          className: 'has-text-warning',
        };
      }

      return {
        id: ind,
        icon: this.faStarRegular,
        className: 'has-text-grey',
      };
    });

    this.showRating = showRating;
  }

  checkIfUserUploaded() {
    if (this.user?.id && this.movie) {
      this.isUserUploaded = this.user.id === this.movie?.user?.id;
    }
  }

  onClickRating(numStars: number): void {
    let newRating = undefined;

    if (this.userRating) {
      if (this.userRating.rating === numStars) return;

      newRating = { ...this.userRating, rating: numStars };
    } else {
      const userId = this.user?.id;
      const movieId: any = this.movie?.id;

      newRating = {
        movieId,
        userId,
        rating: numStars,
      };
    }

    this.movieService.rateMovie(newRating).subscribe((response) => {
      if (response?.status === 403) {
        this.userService.deleteToken();
        this.router.navigateByUrl('/login');
        return;
      }

      if (response?.status === 200 && response.data) {
        this.userRating = response.data;
        this.postRateMovie(this.userRating);

        return;
      }
    });
  }

  postRateMovie(rating: any): void {
    const userId = this.user?.id;
    const userRatingIndex = this.movie.ratings?.findIndex(
      (r) => r.userId == userId
    );

    const ratings = this.movie.ratings ? [...this.movie.ratings] : [];

    if (userRatingIndex !== undefined && userRatingIndex >= 0)
      ratings.splice(userRatingIndex, 1, rating);
    else ratings.push(rating);

    const overallRating =
      ratings.reduce((sum, r: any) => (sum += r.rating), 0) / ratings.length;

    this.movie = { ...this.movie, overallRating, ratings };

    this.setShowRating();
  }

  onClickDelete(): void {
    const movieId: any = this.movie.id;

    const isConfirmed = confirm(
      `Are you sure you want to delete '${this.movie.title}'.`
    );

    if (!isConfirmed) return;

    this.movieService.deleteMovie(movieId).subscribe((response) => {
      if (response?.status === 403) {
        this.userService.deleteToken();
        this.router.navigateByUrl('/login');
        return;
      }

      if (response?.status === 200 && response.data) {
        this.router.navigateByUrl('/movies/my-movies');
        return;
      }

      console.error('Error: ', response.message);
    });
  }
}
