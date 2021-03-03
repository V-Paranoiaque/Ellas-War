import { Component, OnInit } from '@angular/core';

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
  
  public cssUrl: string;
  private cssBase: string;
  
  constructor(private socket: Socket, public user: User,
              public translate: TranslateService,
              public sanitizer: DomSanitizer) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    
    this.cssBase = '/assets/styles/';
    this.cssUrl = this.setStyle();
  }
  
  ngOnInit() {
    this.socket.setupSocketConnection();
    this.translate.use('fr');
    registerLocaleData(localeFr, 'fr');
    
    this.socket.socket.on('ewAuth', (data: any) => {
      if(data) {
        this.user.setUser(data);
        
        let newStyle = this.setStyle();
        if(this.cssUrl != newStyle) {
          this.cssUrl = this.setStyle();
        }
      }
    });
    
    this.socket.socket.on('user', () => {
      let newStyle = this.setStyle();
      if(this.cssUrl != newStyle) {
        this.cssUrl = this.setStyle();
      }
    });
  }
  
  setStyle() {
    let style = this.user.getProperty('style');
    
    if(!environment.style.allowed.includes(style)) {
      style = environment.style.default;
    }
    
    return this.cssBase+style + '.css';
  }
}
