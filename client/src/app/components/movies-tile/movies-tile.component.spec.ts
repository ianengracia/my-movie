import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesTileComponent } from './movies-tile.component';

describe('MoviesTileComponent', () => {
  let component: MoviesTileComponent;
  let fixture: ComponentFixture<MoviesTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
