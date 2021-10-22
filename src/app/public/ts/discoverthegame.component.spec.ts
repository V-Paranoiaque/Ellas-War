import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IconModule } from '@visurel/iconify-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DiscoverTheGameComponent } from './discoverthegame.component';

describe('DiscoverTheGameComponent', () => {
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
        ReactiveFormsModule, FormsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( { 'page': 'default' } ) } } },
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
        ReactiveFormsModule, FormsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( { 'page': '' } ) } } },
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
        ReactiveFormsModule, FormsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( { 'page': 'constructions' } ) } } },
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
        ReactiveFormsModule, FormsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( { 'page': 'treasure' } ) } } },
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
        ReactiveFormsModule, FormsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( { 'page': 'temples' } ) } } },
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
        ReactiveFormsModule, FormsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( { 'page': 'recruitment' } ) } } },
      ],
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(DiscoverTheGameComponent);
    fixture.detectChanges();
  });

  let fixture: ComponentFixture<DiscoverTheGameComponent>;

  it('check /recruitment', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('DiscoverTheGameComponent army', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
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
        ReactiveFormsModule, FormsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( { 'page': 'army' } ) } } },
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
        ReactiveFormsModule, FormsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( { 'page': 'attack' } ) } } },
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
        ReactiveFormsModule, FormsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( { 'page': 'defense' } ) } } },
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
        ReactiveFormsModule, FormsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( { 'page': 'trade' } ) } } },
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
        ReactiveFormsModule, FormsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( { 'page': 'sell' } ) } } },
      ],
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(DiscoverTheGameComponent);
    fixture.detectChanges();
  });

  let fixture: ComponentFixture<DiscoverTheGameComponent>;

  it('check /sell', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('DiscoverTheGameComponent games', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
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
        ReactiveFormsModule, FormsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( { 'page': 'games' } ) } } },
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
        ReactiveFormsModule, FormsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( { 'page': 'treeofthegods' } ) } } },
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
