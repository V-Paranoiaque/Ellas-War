import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'
import { Socket } from '../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../services/user.service';

import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  title = 'Ellas War';
  
  public cssUrl: any;
  public cssPlatform: any;
  private cssBase: string;
  
  constructor(private socket: Socket, public user: User,
              private router: Router,
              public translate: TranslateService,
              public sanitizer: DomSanitizer) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    
    this.cssBase = './assets/styles/';
    this.cssUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.setStyle());
    this.cssPlatform = this.sanitizer.bypassSecurityTrustResourceUrl(this.cssBase+'platform.css');
  }
  
  ngOnInit() {
    this.translate.use('fr');
    registerLocaleData(localeFr, 'fr');
    
    this.socket.setupSocketConnection();
    
    if(!localStorage.getItem('token')) {
      this.user.setInit();
    }
    
    this.socket.on('ewAuth', (data: any) => {
      this.user.setInit();
      
      if(data) {
        this.user.setUser(data)
        
        let newStyle = this.setStyle();
        if(this.cssUrl != newStyle) {
          this.cssUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.setStyle());
        }
        
        //For component to reload after login
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
      }
    });
    
    this.socket.on('user', () => {
      let newStyle = this.setStyle();
      if(this.cssUrl != newStyle) {
        this.cssUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.setStyle());
      }
    });
    
    this.socket.on('config', (data:any) => {
      this.user.setConfig(data);
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('ewAuth');
    this.socket.removeListener('user');
    this.socket.removeListener('config');
  }
  
  setStyle() {
    let style = this.user.getProperty('style');
    
    if(!environment.style.allowed.includes(style)) {
      style = environment.style.default;
    }
    
    return this.cssBase+style + '.css';
  }
}
