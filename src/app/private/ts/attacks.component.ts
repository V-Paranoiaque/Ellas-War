import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import boltIcon from '@iconify/icons-fa-solid/bolt';
import eyeIcon from '@iconify/icons-fa-solid/eye';
import fireIcon from '@iconify/icons-fa-solid/fire';
import fistRaised from '@iconify/icons-fa-solid/fist-raised';
import gemIcon from '@iconify/icons-fa-regular/gem';
import swordIcon from '@iconify/icons-vaadin/sword';



@Component({
  templateUrl: '../html/attacks.component.html',
  styleUrls: ['../css/attacks.component.css']
})

export class Attacks {
  
  private attackListInfo:any;
  private attackOrderSort:string;
  private attackOrderReverse:number;
  private attackPage:number;
  
  public targetProfile:any;
  public targetPossible:any;
  public waveAttackSum:any;
  
  //Icons
  boltIcon   = boltIcon;
  eyeIcon    = eyeIcon;
  fireIcon   = fireIcon;
  fistRaised = fistRaised;
  gemIcon    = gemIcon;
  swordIcon  = swordIcon;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.attackPage = 1;
    this.attackOrderSort = 'other';
    this.attackOrderReverse = 0;
    
    this.waveAttackSum = {};
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
    this.socket.socket.on('waveAttackSum',(data:any) => {
      this.waveAttackSum = data;
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
  
  getArmy() {
    let list:any = [];
    
    for(let i in this.waveAttackSum) {
      if(this.waveAttackSum[i] > 0) {
        list.push({
          'unit': i,
          'nb': this.waveAttackSum[i]
        })
      }
    }
    
    return list;
  }
  
  prepareAttack(id:number) {
    this.socket.emit("profile", id);
    this.socket.emit("attackPossible", id);
    this.socket.emit('waveAttackSum');
  }
  
  launchAttack(id:number) {
    this.targetProfile = null;
    this.socket.emit("attack", id);
  }
}
