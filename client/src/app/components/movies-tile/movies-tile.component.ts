import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/Movie';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movies-tile',
  templateUrl: './movies-tile.component.html',
  styleUrls: ['./movies-tile.component.css'],
})
export class MoviesTileComponent implements OnInit {
  @Input() movie!: Movie;

  faStarIcon = faStar;
  faDotIcon = faCircle;

  constructor() {}

  ngOnInit(): void {}
}
