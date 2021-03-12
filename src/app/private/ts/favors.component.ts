import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/favors.component.html',
  styleUrls: ['../css/favors.component.css']
})

export class Favors {
  public favor:any;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.favor = {
      'id': 0,
      'error': 0
    }
    
    this.socket.socket.on('favorUse', (id:number) => {
      this.favor.error = id;
    });
  }
  
  selectFavor(id:number) {
    this.favor = {
      'id': id,
      'error': 0
    }
  }
  
  useFavor() {
    this.favor.error = 0;
    this.socket.emit('favorUse', this.favor.id);
  }
}
