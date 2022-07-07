import { Rating } from './Rating';
import { User } from './User';

export interface Movie {
  id?: number;

  title: string;

  releaseDate: string;

  runtime: string;

  country: string;

  genre: string;

  production: string;

  director: string;

  cast: string;

  poster: string;

  summary: string;

  user: User;

  ratings?: Rating[];

  overallRating?: number;

  timestamp?: string;
}
