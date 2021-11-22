import { Component } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  selector: 'app-temple3-popup',
  templateUrl: '../html/temple3-popup.sub-component.html',
  styleUrls: ['../css/temple-popup.sub-component.css']
})

export class Temple3PopupSubComponent {
  
  public temple:number;
  public price:any;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.temple = 0;
    this.price = [
      {'resource': 'drachma', 'quantity': 1000000 },
      {'resource': 'wood', 'quantity': 1200000 },
      {'resource': 'stone', 'quantity': 400000 },
      {'resource': 'marble', 'quantity': 8000 }
    ];
  }
  
  setTemple(id:number) {
    if(id == this.temple) {
      this.temple = 0;
    }
    else {
      this.temple = id;
    }
  }
  build() {
    this.socket.emit('buildTemple3', this.temple);
  }
  
  canBuild() {
    for(let i in this.price) {
      if(this.user.getPropertyNb(this.price[i].resource) < this.price[i].quantity) {
        return false;
      }
    }
    return true;
  }
}
