import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { Socket } from '../../../services/socketio.service';

@Component({
  templateUrl: '../html/pagenotfound.component.html'
})

export class PageNotFound {
  
  constructor(private router: Router, private socket: Socket) {
    
  }
  
  ngOnInit() {
    if(this.router.url != '/404-test') {
      this.socket.emit('404', this.router.url);
    }
  }
}
