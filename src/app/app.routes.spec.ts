import { Location } from '@angular/common';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { AppRoutingModule, routes } from './app.routes';
import { appConfig } from './app.config';

describe('The App Routing', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule, ...appConfig.imports],
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
