import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IconModule } from '@visurel/iconify-angular';
import { of } from 'rxjs';

import { DiscoverTheGameComponent } from './discoverthegame.component';

describe('DiscoverTheGameComponent', () => {
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        DiscoverTheGameComponent
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient]
          }
        }),
        OAuthModule.forRoot(),
        HttpClientTestingModule,
        IconModule,
        
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {}, paramMap: of( convertToParamMap( { 'page': 'default' } ) ) } },
      ],
    }).compileComponents();
  });
  
  it('should create the service', () => {
    const fixture = TestBed.createComponent(DiscoverTheGameComponent);
    const app = fixture.componentInstance;
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});

describe('DiscoverTheGameComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        DiscoverTheGameComponent
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient]
          }
        }),
        OAuthModule.forRoot(),
        HttpClientTestingModule,
        IconModule,
        
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {}, paramMap: of( convertToParamMap( { 'page': '' } ) ) } },
      ],
    }).compileComponents();
  });
  
  it('should create the service', () => {
    const fixture = TestBed.createComponent(DiscoverTheGameComponent);
    const app = fixture.componentInstance;
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});

describe('DiscoverTheGameComponent constructions', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        DiscoverTheGameComponent,
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient]
          }
        }),
        OAuthModule.forRoot(),
        HttpClientTestingModule,
        IconModule,
        
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {}, paramMap: of( convertToParamMap( { 'page': 'constructions' } ) ) } },
      ],
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(DiscoverTheGameComponent);
    fixture.detectChanges();
  });

  let fixture: ComponentFixture<DiscoverTheGameComponent>;

  it('check /constructions', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('DiscoverTheGameComponent treasure', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        DiscoverTheGameComponent,
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient]
          }
        }),
        OAuthModule.forRoot(),
        HttpClientTestingModule,
        IconModule,
        
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {}, paramMap: of( convertToParamMap( { 'page': 'treasure' } ) ) } },
      ],
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(DiscoverTheGameComponent);
    fixture.detectChanges();
  });

  let fixture: ComponentFixture<DiscoverTheGameComponent>;

  it('check /treasure', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('DiscoverTheGameComponent temples', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        DiscoverTheGameComponent,
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient]
          }
        }),
        OAuthModule.forRoot(),
        HttpClientTestingModule,
        IconModule,
        
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {}, paramMap: of( convertToParamMap( { 'page': 'temples' } ) ) } },
      ],
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(DiscoverTheGameComponent);
    fixture.detectChanges();
  });

  let fixture: ComponentFixture<DiscoverTheGameComponent>;

  it('check /temples', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('DiscoverTheGameComponent recruitment', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        DiscoverTheGameComponent,
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient]
          }
        }),
        OAuthModule.forRoot(),
        HttpClientTestingModule,
        IconModule,
        
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {}, paramMap: of( convertToParamMap( { 'page': 'recruitment' } )) } }
      ],
    });

    await TestBed.compileComponents();
  });

  it('check /recruitment', () => {
    const fixture = TestBed.createComponent(DiscoverTheGameComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('DiscoverTheGameComponent army', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        DiscoverTheGameComponent,
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient]
          }
        }),
        OAuthModule.forRoot(),
        HttpClientTestingModule,
        IconModule,
        
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {}, paramMap: of( convertToParamMap( { 'page': 'army' } ) ) } },
      ],
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(DiscoverTheGameComponent);
    fixture.detectChanges();
  });

  let fixture: ComponentFixture<DiscoverTheGameComponent>;

  it('check /army', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('DiscoverTheGameComponent attack', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        DiscoverTheGameComponent,
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient]
          }
        }),
        OAuthModule.forRoot(),
        HttpClientTestingModule,
        IconModule,
        
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {}, paramMap: of( convertToParamMap( { 'page': 'attack' } ) ) } },
      ],
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(DiscoverTheGameComponent);
    fixture.detectChanges();
  });

  let fixture: ComponentFixture<DiscoverTheGameComponent>;

  it('check /attack', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('DiscoverTheGameComponent defense', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        DiscoverTheGameComponent,
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient]
          }
        }),
        OAuthModule.forRoot(),
        HttpClientTestingModule,
        IconModule,
        
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {}, paramMap: of( convertToParamMap( { 'page': 'defense' } ) ) } },
      ],
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(DiscoverTheGameComponent);
    fixture.detectChanges();
  });

  let fixture: ComponentFixture<DiscoverTheGameComponent>;

  it('check /defense', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('DiscoverTheGameComponent trade', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        DiscoverTheGameComponent,
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient]
          }
        }),
        OAuthModule.forRoot(),
        HttpClientTestingModule,
        IconModule,
        
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {}, paramMap: of( convertToParamMap( { 'page': 'trade' } ) ) } },
      ],
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(DiscoverTheGameComponent);
    fixture.detectChanges();
  });

  let fixture: ComponentFixture<DiscoverTheGameComponent>;

  it('check /trade', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('DiscoverTheGameComponent sell', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        DiscoverTheGameComponent,
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient]
          }
        }),
        OAuthModule.forRoot(),
        HttpClientTestingModule,
        IconModule,
        
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {}, paramMap: of( convertToParamMap( { 'page': 'sell' } ) ) } },
      ],
    });

    await TestBed.compileComponents();
  });

  it('check /sell', () => {
    const fixture = TestBed.createComponent(DiscoverTheGameComponent);

    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('DiscoverTheGameComponent games', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        DiscoverTheGameComponent,
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient]
          }
        }),
        OAuthModule.forRoot(),
        HttpClientTestingModule,
        IconModule,
        
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {}, paramMap: of(convertToParamMap( { 'page': 'games' } )) } },
      ],
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(DiscoverTheGameComponent);
    fixture.detectChanges();
  });

  let fixture: ComponentFixture<DiscoverTheGameComponent>;

  it('check /games', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('DiscoverTheGameComponent treeofthegods', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        DiscoverTheGameComponent,
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient]
          }
        }),
        OAuthModule.forRoot(),
        HttpClientTestingModule,
        IconModule,
        
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {}, paramMap: of( convertToParamMap( { 'page': 'treeofthegods' } ) ) } },
      ],
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(DiscoverTheGameComponent);
    fixture.detectChanges();
  });

  let fixture: ComponentFixture<DiscoverTheGameComponent>;

  it('check /treeofthegods', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
