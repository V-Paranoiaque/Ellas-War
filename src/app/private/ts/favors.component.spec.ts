import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IconModule } from '@visurel/iconify-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuComponent } from '../../menu/menu.component';
import { PrivateComponent } from '../private.component';
import { FavorsComponent } from './favors.component';
import { EwIconSubComponent } from '../../../services/ew-icon.service';

describe('FavorsComponent', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MenuComponent,
        PrivateComponent,
        EwIconSubComponent
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
        Socket, User, OAuthService,
        BsModalService
      ],
    }).compileComponents();
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection('dev.ellaswar.com');
  });
  
  it('should create the service', () => {
    const fixture = TestBed.createComponent(FavorsComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}