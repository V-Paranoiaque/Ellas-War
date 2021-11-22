import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { UserComponent as User } from '../../../services/user.service';
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
import { StoreroomComponent } from './storeroom.component';
import { EwIconSubComponent } from '../../../services/ew-icon.service';

describe('StoreroomComponent', () => {
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
    const fixture = TestBed.createComponent(StoreroomComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  
  it('Check storeroomBuy', () => {
    const fixture = TestBed.createComponent(StoreroomComponent);
    const app = fixture.componentInstance;
    app.storeroomBuy(0, 0, 0);
    fixture.detectChanges();
    expect(app.storeroom_ress[0]).toBe('');
  });
  
  it('Check storeroomRedeem', () => {
    const fixture = TestBed.createComponent(StoreroomComponent);
    const app = fixture.componentInstance;
    app.storeroomRedeem(0, 0);
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('Check storeroomSell', () => {
    const fixture = TestBed.createComponent(StoreroomComponent);
    const app = fixture.componentInstance;
    
    //Fake data
    app.storeroomQuantity = '0';
    app.storeroomRate = '0';
    app.storeroomRess = 0;
    
    app.storeroomSell();
    fixture.detectChanges();
    expect(app.storeroomQuantity).toBe('');
  });
  
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
