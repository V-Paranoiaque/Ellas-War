import { Component, OnInit } from '@angular/core';

import { MessagesComponent } from './messages.component';

@Component({
  selector: 'app-messages-popup',
  templateUrl: '../html/messages-popup.sub-component.html'
})

export class MessagesPopupSubComponent extends MessagesComponent implements OnInit {
  
  ngOnInit() {
    this.user.checkPermissions([0,1,2,3,4,5]);
  }
}
