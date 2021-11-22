import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  selector: 'app-temple-change-info-popup',
  templateUrl: '../html/temple-change-info-popup.sub-component.html',
  styleUrls: ['../css/temple-change-info-popup.sub-component.css']
})

export class TempleChangeInfoPopupSubComponent implements OnInit, OnDestroy {
  public temple:number;
  public templeChangeError:number;
  public templeChangeHistory:any;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.temple = 0;
    this.templeChangeError = 0;
    this.templeChangeHistory = [];
    
  }
  
  ngOnInit() {
    this.socket.on('templeChange', (data:number) => {
      this.templeChangeError = data;
      this.socket.emit('templeChangeHistory');
    });
    this.socket.on('templeChangeHistory', (data:any) => {
      this.templeChangeHistory = [];
      for(let i in data) {
        this.templeChangeHistory.push(data[i]);
      }
    });
    
    this.socket.emit('templeChangeHistory');
  }
  
  ngOnDestroy() {
    this.socket.removeListener('templeChange');
    this.socket.removeListener('templeChangeHistory');
  }
  
  
  getPrice() {
    switch(this.temple) {
      case 1:
      case 2:
      case 3:
        return [
          { 'resource': 'drachma', quantity: 200000 },
          { 'resource': 'wood', quantity: 160000 },
          { 'resource': 'stone', quantity: 20000 },
          { 'resource': 'marble', quantity: 500 },
          { 'resource': 'favor', quantity: 1 }
        ]
      case 4:
      case 5:
        return [
          { 'resource': 'drachma', quantity: 500000 },
          { 'resource': 'wood', quantity: 400000 },
          { 'resource': 'stone', quantity: 50000 },
          { 'resource': 'marble', quantity: 1250 },
          { 'resource': 'favor', quantity: 2 }
        ]
      case 6:
      case 7:
      case 8:
        return [
          { 'resource': 'drachma', quantity: 1000000 },
          { 'resource': 'wood', quantity: 1200000 },
          { 'resource': 'stone', quantity: 400000 },
          { 'resource': 'marble', quantity: 8000 },
          { 'resource': 'favor', quantity: 3 }
        ]
      case 9:
      case 10:
      case 11:
        return [
          { 'resource': 'drachma', quantity: 4000000 },
          { 'resource': 'wood', quantity: 25000000 },
          { 'resource': 'stone', quantity: 1600000 },
          { 'resource': 'marble', quantity: 160000 },
          { 'resource': 'gold', quantity: 120000 },
          { 'resource': 'favor', quantity: 4 }
        ]
      default:
        return [];
    }
  }
  
  selectTemples(id:number) {
    this.temple = id;
    this.socket.emit('templeChangeError', id);
  }
  
  templeChange(templeNew:number) {
    let res = {
      'old': this.temple,
      'choice': templeNew
    };
    this.socket.emit('templeChange', res);
  }
}
