import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesFeaturedComponent } from './movies-featured.component';

describe('MoviesFeaturedComponent', () => {
  let component: MoviesFeaturedComponent;
  let fixture: ComponentFixture<MoviesFeaturedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesFeaturedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
