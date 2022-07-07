import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/Movie';

@Component({
  selector: 'app-movies-container',
  templateUrl: './movies-container.component.html',
  styleUrls: ['./movies-container.component.css'],
})
export class MoviesContainerComponent implements OnInit {
  @Input() movies: Movie[] = [];
  @Input() title: string = 'All Movies';
  @Input() searchFor: string | undefined = undefined;
  @Input() canAddNew: boolean = false;

  isEmpty: boolean = false;
  isLoading: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isLoading = false;
  }
  ngOnChanges(): void {
    if (this.isLoading) return;

    this.isEmpty = !this.movies || !this.movies.length;
  }

  onClick(movie: Movie): void {
    this.router.navigateByUrl(`/movies/details?id=${movie.id}`);
  }
}
