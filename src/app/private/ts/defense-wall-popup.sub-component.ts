import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

import shieldShaded from '@iconify/icons-bi/shield-shaded';

@Component({
  selector: 'app-defense-wall-popup',
  templateUrl: '../html/defense-wall-popup.sub-component.html',
})

export class DefenseWallPopupSubComponent implements OnInit, OnDestroy {
  
  public defenseWallStrength:number;
  
  Number =  Number;
  
  shieldShaded = shieldShaded;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.defenseWallStrength = 0;
  }
  
  ngOnInit() {
    this.socket.emit('defenseWallStrength');
    
    this.socket.on('defenseWallStrength', (data:number) => {
      this.defenseWallStrength = data;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('defenseWallStrength');
  }
}
