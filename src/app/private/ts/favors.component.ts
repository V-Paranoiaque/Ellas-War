import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/favors.component.html',
  styleUrls: ['../css/favors.component.css']
})

export class FavorsComponent implements OnInit, OnDestroy {
  public favor:any;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.favor = {
      'id': 0,
      'error': 0
    }
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.socket.on('favorUse', (id:number) => {
      this.favor.error = id;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('favorUse');
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
