import { Location } from '@angular/common';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { routes } from './app-routing.module';
import { AppModule } from './app.module';

describe('The App Routing', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [provideRouter(routes)],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('Test /', fakeAsync(() => {
    void router.navigate(['']);
    tick();
    expect(location.path()).toBe('');
  }));
});
