import { Component, OnInit } from '@angular/core';

import { Socket } from '../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';

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
  cssUrl: string;
  
  constructor(private socket: Socket, public translate: TranslateService,
              public sanitizer: DomSanitizer) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    
    this.cssUrl = '/assets/styles/'+environment.style+'.css';
  }
  
  ngOnInit() {
    this.socket.setupSocketConnection();
    this.translate.use('fr');
    registerLocaleData(localeFr, 'fr');
  }
}
