import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'temple-info-popup',
  templateUrl: '../html/temple-info-popup.sub-component.html'
})

export class TempleInfoPopup {
  @Input() temple: any;
  
  public wallDefense:number;
  public idToUser:string;
  public id:number;
  public preUseList:any;
  public furyNb:any;
  public furyCost:any;
  public lightningCost:any;
  public lightningNb:any;
  
  Number = Number;
  
  constructor(private http: HttpClient, private socket: Socket, public user: User, public translate: TranslateService) {
    this.wallDefense = 0;
    this.idToUser = '';
    this.id = 0;
    this.preUseList = {};
    this.furyNb = '';
    this.lightningNb = '';
    
    this.furyCost = {
      'drachma': (300000+user.getPropertyNb('level')*20000),
      'food': (1000000+user.getPropertyNb('level')*20000),
      'wood': (400000+user.getPropertyNb('level')*10000)
    }
    this.lightningCost = {
      'food': 4000000,
      'wine': 80000,
      'gold': 60000
    }
  }
  
  ngOnInit() {
    this.socket.emit('wallDefense');
    this.socket.emit('myAttacksList');
    
    this.socket.on('wallDefense', (def:number) => {
      this.wallDefense = def;
    });
    this.socket.on('myAttacksList', (result:any) => {
      this.preUseList = result;
    });
    
    this.socket.on('powersUse', (result:any) => {
      this.temple.error = result.error;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('wallDefense');
    this.socket.removeListener('myAttacksList');
    this.socket.removeListener('powersUse');
  }
  
  furyBuy(nb:number) {
    this.socket.emit('furyBuy', nb);
    this.furyNb = '';
  }
  
  furyCostMissing() {
    let list = [];
    
    for(let res in this.furyCost) {
      if(this.furyCost[res]*this.furyNb > this.user.getPropertyNb(res)) {
        list.push(res);
      }
    }
    
    return list;
  }
  
  lightningBuy(nb:number) {
    this.socket.emit('lightningBuy', nb);
    this.lightningNb = '';
  }
  
  lightningCostMissing() {
    let list = [];
    
    for(let res in this.lightningCost) {
      if(this.lightningCost[res]*this.furyNb > this.user.getPropertyNb(res)) {
        list.push(res);
      }
    }
    
    return list;
  }
  
  powerUse(powerid:number, param:number) {
    let info = {
      'id': powerid,
      'param': param
    }
    this.temple.power = powerid;
    this.socket.emit('powersUse', info);
  }
  
  powerUseTarget(powerid:any) {
    let info;
    this.temple.power = powerid;
    if(this.idToUser.length > 0) {
      if(this.user.config.url) {
        let url = this.user.config.url+'/api/playerProfile/'+this.idToUser+'.json'
        
        this.http.get(url).subscribe((res:any) => {
          if(res && res.membre_id) {
            info = {
              'id': this.temple.power,
              'param': res.membre_id
            }
            this.socket.emit('powersUse', info);
          }
          else {
            this.idToUser = '';
            this.temple.error = 2;
          }
        });
      }
    }
    else {
      this.idToUser = '';
      this.temple.error = 2;
    }
    
    info = {
      'id': powerid,
      'param': this.idToUser
    }
    this.temple.power = powerid;
    this.socket.emit('powersUse', info);
  }
  
  wallErect() {
    this.socket.emit('wallErect');
  }
}
