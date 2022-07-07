import { Component, OnInit } from '@angular/core';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { faStar } from '@fortawesome/free-solid-svg-icons';

SwiperCore.use([Autoplay, Pagination]);

@Component({
  selector: 'app-movies-featured',
  templateUrl: './movies-featured.component.html',
  styleUrls: ['./movies-featured.component.css'],
})
export class MoviesFeaturedComponent implements OnInit {
  faStarIcon = faStar;

  featuredMovies: any[] = [
    {
      title: 'The Girl With the Swaying Mantle',
      image: './assets/images/featured-1.jpg',
      rating: 8,
      runtime: 200,
      genre: 'Action, Adventure',
      summary:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At iure odio autem accusamus eligendi aliquam dolorem corrupti. Porro in inventore amet, totam, minus dignissimos repellat veritatis pariatur sit aut debitis.',
    },
    {
      title: 'Cinema: The Front Door Story',
      image: './assets/images/featured-2.jpg',
      rating: 7.5,
      runtime: 127,
      genre: 'Documentary',
      summary:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At iure odio autem accusamus eligendi aliquam dolorem corrupti. Porro in inventore amet, totam, minus dignissimos repellat veritatis pariatur sit aut debitis.',
    },
    {
      title: 'Not So Nutcracker: The Musical',
      image: './assets/images/featured-3.jpg',
      rating: 10,
      runtime: 112,
      genre: 'Musical, Comedy',
      summary:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At iure odio autem accusamus eligendi aliquam dolorem corrupti. Porro in inventore amet, totam, minus dignissimos repellat veritatis pariatur sit aut debitis.',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
