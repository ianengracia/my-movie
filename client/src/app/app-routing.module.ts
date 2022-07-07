import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieFormComponent } from './components/movie-form/movie-form.component';

import { MovieComponent } from './pages/movie/movie.component';
import { AllMoviesComponent } from './pages/movies/all-movies/all-movies.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { SearchMoviesComponent } from './pages/movies/search-movies/search-movies.component';
import { UserMoviesComponent } from './pages/movies/user-movies/user-movies.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { LoginComponent } from './pages/user/login/login.component';
import { SignupComponent } from './pages/user/signup/signup.component';
import { UserComponent } from './pages/user/user.component';

import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },

  {
    path: 'signup',
    component: UserComponent,
    children: [{ path: '', component: SignupComponent }],
  },

  {
    path: 'login',
    component: UserComponent,
    children: [{ path: '', component: LoginComponent }],
  },

  {
    path: 'movies',
    component: MoviesComponent,
    children: [
      { path: '', component: AllMoviesComponent },
      { path: 'search', component: SearchMoviesComponent },
      {
        path: 'my-movies',
        component: UserMoviesComponent,
        canActivate: [AuthGuard],
      },
      { path: 'details', component: MovieComponent },

      { path: 'new', component: MovieFormComponent, canActivate: [AuthGuard] },
      {
        path: 'update',
        component: MovieFormComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
