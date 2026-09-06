import { TestBed } from '@angular/core/testing';
import { jest } from '@jest/globals';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AppComponent } from './app';
import { appConfig } from './app.config.spec';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ...appConfig.imports
      ],
      providers: [...appConfig.providers],
    }).compileComponents();
    jest.spyOn(TestBed.inject(OAuthService), 'loadDiscoveryDocumentAndTryLogin')
      .mockResolvedValue(false);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Ellas War'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.setTitle('Ellas War');
    expect(app.title).toEqual('Ellas War');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.innerHTML).toContain('router-outlet');
  });
});
