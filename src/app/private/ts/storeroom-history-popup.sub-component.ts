import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  selector: 'app-storeroom-history-popup',
  templateUrl: '../html/storeroom-history-popup.sub-component.html'
})

export class StoreroomHistoryPopupSubComponent implements OnInit, OnDestroy {
  
  public list:any=[];
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    
  }
  
  ngOnInit() {
    this.socket.on('storeroomHistory', (data) => {
      this.list = data.reverse();
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('storeroomHistory');
  }
}
