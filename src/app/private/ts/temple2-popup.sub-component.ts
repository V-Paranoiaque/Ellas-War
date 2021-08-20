import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'app-temple2-popup',
  templateUrl: '../html/temple2-popup.sub-component.html',
  styleUrls: ['../css/temple-popup.sub-component.css']
})

export class Temple2PopupSubComponent {
  
  public temple:number;
  public price:any;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.temple = 0;
    this.price = [
      {'resource': 'drachma', 'quantity': 500000 },
      {'resource': 'wood', 'quantity': 400000 },
      {'resource': 'stone', 'quantity':  50000 },
      {'resource': 'marble', 'quantity': 1250 }
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
    this.socket.emit('buildTemple2', this.temple);
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
