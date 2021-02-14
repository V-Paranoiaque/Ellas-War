import { Component, OnInit } from '@angular/core';

import { Socket } from '../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  title = 'Ellas War';
  
  constructor(private socket: Socket,
              public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
  }
  
  ngOnInit() {
    this.socket.setupSocketConnection();
    this.translate.use('fr');
    registerLocaleData(localeFr, 'fr');
  }
}
