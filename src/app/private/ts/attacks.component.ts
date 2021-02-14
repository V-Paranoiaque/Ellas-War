import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/attacks.component.html'
})

export class Attacks {
  
  private attackListInfo:any;
  private attackOrderSort:string;
  private attackOrderReverse:number;
  private attackPage:number;
  
  public targetProfile:any;
  public targetPossible:any;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.attackPage = 1;
    this.attackOrderSort = 'other';
    this.attackOrderReverse = 0;
  }

  ngOnInit(){
    setTimeout(() => {
      this.socket.socket.emit("attackList", {
        'page': this.attackPage,
        'order': this.attackOrderSort,
        'reverse': this.attackOrderReverse
      });
    }, 0);
    
    this.socket.socket.on('attackList', (datas:any) => {
      this.attackListInfo = Object.assign([], datas);
      this.attackListInfo.list = [];
      for(let city in datas.list) {
        this.attackListInfo.list.push(datas.list[city]);
      }
    });
    
    this.socket.socket.on('profile',(data:any) => {
      this.targetProfile = data;
    });
    this.socket.socket.on('attackPossible',(data:any) => {
      this.targetPossible = data;
    });
  }
  
  getAttackList() {
    if(this.attackListInfo && this.attackListInfo.list) {
      return this.attackListInfo.list;
    }
    else {
      return [];
    }
  }
  
  prepareAttack(id:number) {
    this.socket.socket.emit("profile", id);
    this.socket.socket.emit("attackPossible", id);
  }
  
  launchAttack(id:number) {
    this.targetProfile = null;
    this.socket.emit("attack", id);
  }
}
