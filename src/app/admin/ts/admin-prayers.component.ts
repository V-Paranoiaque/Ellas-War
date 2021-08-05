import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import plusIcon from '@iconify/icons-bi/plus';

@Component({
  templateUrl: '../html/admin-prayers.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminPrayers {
  
  public adminPrayersList:any;
  public request:any;
  
  plusIcon = plusIcon;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.adminPrayersList = [];
    this.request = {
      'quantity': '',
      'player': '',
      'type': 0
    };
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.socket.emit('adminPrayersList');
    
    this.socket.on('adminPrayersList', (data:any) => {
      this.adminPrayersList = data;
    });
    this.socket.on('adminPrayersRefresh', () => {
      this.socket.emit('adminPrayersList');
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('adminPrayersList');
    this.socket.removeListener('adminPrayersRefresh');
  }
  
  prayersAsk() {
    this.socket.emit('adminPrayersAsk', {
      'target': this.request.player,
      'nb': this.request.quantity,
      'type': this.request.type
    });
    this.request = {
      'quantity': '',
      'player': '',
      'type': 0
    };
  }
  
  prayersValide(id:number, result:number) {
    this.socket.emit('adminPrayersValide', {'id': id, 'result': result});
  }
}
