import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Router, RouterModule } from '@angular/router';
import { SocketComponent as Socket } from '../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../services/user.service';
import { ToolsComponent as Tools } from '../services/tools.service';
import {
  DomSanitizer,
  SafeResourceUrl,
  Title,
} from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { registerLocaleData } from '@angular/common';
import { Subscription } from 'rxjs';
import localeFr from '@angular/common/locales/fr';

declare let cordova: {
  InAppBrowser: {
    open: (url: string, arg1: string, arg2: string) => object;
  };
};
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [RouterModule, TranslateModule],
  providers: [TranslateService],
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly socket = inject(Socket);
  user = inject(User);
  private readonly router = inject(Router);
  translate = inject(TranslateService);
  sanitizer = inject(DomSanitizer);
  private readonly oauthService = inject(OAuthService);
  private readonly titleService = inject(Title);

  title = 'Ellas War';

  public cssUrl: SafeResourceUrl;
  public cssPlatform: SafeResourceUrl;
  private readonly cssBase: string;
  private readonly sub: Subscription;

  constructor() {
    const translate = this.translate;

    translate.addLangs(environment.language.allowed);
    translate.setFallbackLang(environment.language.default);

    this.cssBase = './assets/styles/';
    this.cssUrl = this.setUrl(this.setStyle());
    this.cssPlatform = this.setUrl(this.cssBase + 'platform.css');

    this.oauthInit();

    this.sub = this.socket.onChange.subscribe({
      next: (event: { action: string; username: string }) => {
        if (event.action == 'appReload') {
          this.ngOnDestroy();
          this.ngOnInit();
        }
      },
    });
  }

  oauthInit() {
    const authConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      redirectUri: window.location.origin + '/auth/google',
      clientId: environment.google.client_id,
      scope: 'openid profile email',
      strictDiscoveryDocumentValidation: false,
    };

    this.oauthService.configure(authConfig);
    void this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  ngOnInit() {
    let language: string;
    registerLocaleData(localeFr, 'fr');

    this.socket.setupSocketConnection(this.socket.detectServer());

    if (environment.mobile == 0) {
      language = this.socket.detectServerLanguage();
    } else {
      language = Socket.detectLanguage();
    }
    this.translate.use(language);

    if (!localStorage.getItem('token')) {
      this.user.setInit();
    }

    this.ngOnInitSocket();
  }

  ngOnInitSocket() {
    this.socket.on('ewAuth', (data?: object) => {
      this.user.setInit();
      const oldStatus = this.user.getPropertyNb('mstatus');

      if (data) {
        this.user.setUser(data);

        const newStyle = this.setStyle();
        if (this.cssUrl != newStyle) {
          this.cssUrl = this.setUrl(this.setStyle());
        }
        this.translate.use(this.user.getProperty('language') as string);

        if (oldStatus !== this.user.getPropertyNb('mstatus')) {
          //For component to reload after login
          this.user.reload();
        }
      }
    });

    this.socket.on('user', (data?: object) => {
      if (data) {
        this.user.setUser(data);
      }
      const newStyle = this.setStyle();
      if (this.cssUrl != newStyle) {
        this.cssUrl = this.setUrl(this.setStyle());
      }
    });
    this.socket.on('userRefresh', () => {
      this.socket.emit('user');
    });
    this.socket.on('ress', (data?: object) => {
      if (data) {
        this.user.setUserRess(data);
      }
    });
    this.socket.on('redirect', () => {
      void this.router.navigate(['/']);
    });

    this.socket.on('config', (data: object) => {
      this.user.setConfig(data);
    });

    //oauth
    this.socket.on('connectionToken', (data: { token: string }) => {
      localStorage.removeItem('token');
      if (data.token) {
        const token = data.token;
        this.socket.emit('ewAuth', { token: token });
        localStorage.setItem('token', token);
        void this.router.navigate(['/']);
      }
    });

    this.socket.on('oauth2Server', (token: string) => {
      const url =
        'https://accounts.google.com/o/oauth2/v2/auth/identifier' +
        '?client_id=' +
        environment.google.client_id +
        '&response_type=id_token token' +
        '&state=' +
        token +
        '&redirect_uri=' +
        this.user.config.url +
        '/auth/google' +
        '&scope=profile email' +
        '&flowName=GeneralOAuthFlow' +
        '&nonce=' +
        token;
      cordova.InAppBrowser.open(
        url,
        '_system',
        'location=yes,clearsessioncache=yes'
      );
    });

    this.socket.on('oauth2Close', () => {
      window.self.close();
    });

    this.socket.on('redirect', () => {
      void this.router.navigate(['/']);
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('ewAuth');
    this.socket.removeListener('user');
    this.socket.removeListener('ress');
    this.socket.removeListener('config');
    this.socket.removeListener('connectionFB');
    this.socket.removeListener('oauth2Server');
    this.socket.removeListener('oauth2Close');
    this.socket.removeListener('redirect');
    this.sub.unsubscribe();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  setStyle() {
    return (
      this.cssBase +
      Tools.getStyle(this.user.getProperty('style') as string) +
      '.css'
    );
  }

  setUrl(style: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(style);
  }
}
