import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SwiperModule } from 'swiper/angular';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ButtonComponent } from './components/button/button.component';
import { ImageComponent } from './components/image/image.component';
import { MoviesContainerComponent } from './components/movies-container/movies-container.component';
import { MoviesTileComponent } from './components/movies-tile/movies-tile.component';
import { UserButtonsComponent } from './components/user-buttons/user-buttons.component';
import { UserToolbarComponent } from './components/user-toolbar/user-toolbar.component';

import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './pages/user/login/login.component';
import { SignupComponent } from './pages/user/signup/signup.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieComponent } from './pages/movie/movie.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { UserMoviesComponent } from './pages/movies/user-movies/user-movies.component';
import { AllMoviesComponent } from './pages/movies/all-movies/all-movies.component';
import { SearchMoviesComponent } from './pages/movies/search-movies/search-movies.component';

import { tokenGetter } from './services/user.service';
import { AuthGuard } from './shared/auth.guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoResultComponent } from './components/no-result/no-result.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { MoviesFeaturedComponent } from './components/movies-featured/movies-featured.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ButtonComponent,
    ImageComponent,
    UserComponent,
    LoginComponent,
    SignupComponent,
    MoviesComponent,
    MovieComponent,
    NotfoundComponent,
    UserButtonsComponent,
    UserToolbarComponent,
    UserMoviesComponent,
    AllMoviesComponent,
    SearchMoviesComponent,
    MoviesContainerComponent,
    MoviesTileComponent,
    NoResultComponent,
    MovieFormComponent,
    MoviesFeaturedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    SwiperModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
      },
    }),
  ],
  providers: [AuthGuard, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
