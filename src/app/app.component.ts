import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router'
import { SocketComponent as Socket } from '../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../services/user.service';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { registerLocaleData } from '@angular/common';
import { Subscription } from 'rxjs';
import localeFr from '@angular/common/locales/fr';

declare let cordova:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'Ellas War';
  
  public cssUrl: any;
  public cssPlatform: any;
  private cssBase: string;
  private sub:Subscription;
  
  constructor(private socket: Socket, public user: User,
              private router: Router,
              public translate: TranslateService,
              public sanitizer: DomSanitizer,
              private oauthService: OAuthService,
              private titleService: Title) {
    translate.addLangs(environment.language.allowed);
    translate.setDefaultLang(environment.language.default);
    
    this.cssBase = './assets/styles/';
    this.cssUrl = this.setUrl(this.setStyle());
    this.cssPlatform = this.setUrl(this.cssBase+'platform.css');
    
    let authConfig:AuthConfig = {
      issuer: 'https://accounts.google.com',
      redirectUri: window.location.origin + '/auth/google', 
      clientId: environment.google.client_id,
      scope: 'openid profile email',
      strictDiscoveryDocumentValidation: false
    };
    
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    
    this.sub = this.socket.onChange.subscribe({
      next: (event: any) => {
        if(event.action == 'appReload') {
          this.ngOnDestroy();
          this.ngOnInit();
        }
      }
    })
  }
  
  ngOnInit() {
    registerLocaleData(localeFr, 'fr');
    
    this.socket.setupSocketConnection(this.socket.detectServer());
    
    if(environment.mobile == 0) {
      let language = this.socket.detectServerLanguage();
      this.translate.use(language);
    }
    else {
      let language = this.socket.detectLanguage();
      this.translate.use(language);
    }
    
    if(!localStorage.getItem('token')) {
      this.user.setInit();
    }

    this.ngOnInitSocket();
  }
  
  ngOnInitSocket() {
    this.socket.on('ewAuth', (data: any) => {
      this.user.setInit();
      const oldStatus = this.user.getPropertyNb('mstatus');
      
      if(data) {
        this.user.setUser(data)
        
        let newStyle = this.setStyle();
        if(this.cssUrl != newStyle) {
          this.cssUrl = this.setUrl(this.setStyle());
        }
        
        this.translate.use(this.user.getProperty('language'));
        
        if(oldStatus != this.user.getPropertyNb('mstatus')) {
          //For component to reload after login
          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.navigate([currentUrl]);
        }
      }
    });
    
    this.socket.on('user', () => {
      let newStyle = this.setStyle();
      if(this.cssUrl != newStyle) {
        this.cssUrl = this.setUrl(this.setStyle());
      }
    });
    
    this.socket.on('config', (data) => {
      this.user.setConfig(data);
    });
    
    //oauth
    this.socket.on('connectionToken', (data) => {
      localStorage.removeItem('token');
      if(data && data.token) {
        let token = data.token;
        this.socket.emit('ewAuth', {'token': token});
        localStorage.setItem('token', token);
        this.router.navigate(['/city']);
      }
    });

    this.socket.on('oauth2Server', (token:string) => {
      const url = 'https://accounts.google.com/o/oauth2/v2/auth/identifier'+
      '?client_id='+environment.google.client_id+
      '&response_type=id_token token'+
      '&state='+token+
      '&redirect_uri='+this.user.config.url+'/auth/google'+
      '&scope=profile email'+
      '&flowName=GeneralOAuthFlow'+
      '&nonce='+token;
      cordova.InAppBrowser.open(url, '_system', 'location=yes,clearsessioncache=yes');
    });

    this.socket.on('oauth2Close', () => {
      if(window.self)
      window.self.close();
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('ewAuth');
    this.socket.removeListener('user');
    this.socket.removeListener('config');
    this.socket.removeListener('connectionFB');
    this.socket.removeListener('oauth2Server');
    this.socket.removeListener('oauth2Close');
    
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }
  
  detectBrowserLanguage() {
    let browserLanguage = navigator.language.split('-')[0];
    if(!environment.language.allowed.includes(browserLanguage)) {
      return environment.language.default;
    }
    return browserLanguage;
  }
  
  setStyle() {
    let style = this.user.getProperty('style');
    
    if(!environment.style.allowed.includes(style)) {
      style = environment.style.default;
    }
    
    return this.cssBase+style + '.css';
  }
  
  setUrl(style:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(style);
  }
  
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
