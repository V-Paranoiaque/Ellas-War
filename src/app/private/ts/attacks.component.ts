import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import boltIcon from '@iconify/icons-fa-solid/bolt';
import dotCircle from '@iconify/icons-fa-solid/dot-circle';
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
  
  public attackInfo:any;
  public attackMode:number;
  public attackStats:any;
  public diamondInfo:any;
  public diamondRankingPlayers:any;
  public diamondRankingAlliance:any;
  public realWaveAttackCheck:any;
  public menuMode:number;
  public furyInfo:any;
  public furyPossible:any;
  public lightningPossible:any;
  public lightningInfo:any;
  public ressList:any;
  public spyInfo:any;
  public targetProfile:any;
  public attackPossible:any;
  public waveAttackSum:any;
  
  Object = Object;
  
  //Icons
  boltIcon   = boltIcon;
  dotCircle  = dotCircle;
  eyeIcon    = eyeIcon;
  fireIcon   = fireIcon;
  fistRaised = fistRaised;
  gemIcon    = gemIcon;
  swordIcon  = swordIcon;
  
  constructor(protected socket: Socket, public user: User, public translate: TranslateService) {
    this.attackPage = 1;
    this.attackOrderSort = 'other';
    this.attackOrderReverse = 0;
    this.ressList = environment.resources;
    
    this.attackInfo = {};
    /* Mode
     * 0: History
     * 1: Observe with Apollo
     * 2: Spy
     * 3: Prepare to attack
     * 4: Attack
     * 5: Prepare fury
     * 6: Fury
     * 7: Prepare lightning
     * 8: Lightning
     */
    this.attackMode = 0;
    this.menuMode = 0;
    
    this.furyInfo = {
      'lost_build': {
        'farm': 0,
        'growers': 0
      },
      'lost_ress': {
        'food': 0,
        'grapes': 0
      }
    };
    this.lightningInfo = {'lost_build':[]}
    this.spyInfo = {};
    this.targetProfile = {};
    
    this.waveAttackSum = {};
    
    this.attackStats = {
      'normal': {
        'done': 0,
        'available': 0,
        'unavailable': 0,
        'time': 0
      },
      'war': {
        'done': 0,
        'available': 0,
        'unavailable': 0,
        'time': 0
      },
      'bonus': {
        'done': 0,
        'available': 0,
        'unavailable': 0,
        'time': 0
      },
      'receive_normal': {
        'done': 0,
        'available': 0,
        'unavailable': 0,
        'time': 0
      },
      'receive_war': {
        'done': 0,
        'available': 0,
        'unavailable': 0,
        'time': 0
      }
    };
    this.diamondInfo = {};
    this.diamondRankingPlayers = [];
    this.diamondRankingAlliance = [];
    this.realWaveAttackCheck = {
      'ress': {},
      'habitation': {}
    };
  }
  
  ngOnInit(){
    setTimeout(() => {
      this.socket.emit("attackList", {
        'page': this.attackPage,
        'order': this.attackOrderSort,
        'reverse': this.attackOrderReverse
      });
      this.socket.emit('realWaveAttackCheck');
    }, 0);
    
    this.socket.on('attack', (datas:any) => {
      this.attackMode = 4;
      this.attackInfo = datas;
    });
    
    this.socket.on('attackList', (datas:any) => {
      this.attackListInfo = Object.assign([], datas);
      this.attackListInfo.list = [];
      for(let city in datas.list) {
        this.attackListInfo.list.push(datas.list[city]);
      }
    });
    this.socket.on('attackStats', (datas:any) => {
      this.attackStats = datas;
    });
    this.socket.on('diamondInfo', (info:any) => {
      this.diamondInfo = info;
    });
    this.socket.on('diamondRankingPlayers', (info:any) => {
      this.diamondRankingPlayers = info;
    });
    this.socket.on('diamondRankingAlliance', (info:any) => {
      this.diamondRankingAlliance = info;
    });
    this.socket.on('profile',(data:any) => {
      this.targetProfile = data;
    });
    this.socket.on('attackPossible',(data:any) => {
      this.attackPossible = data.result;
    });
    this.socket.on('furyPossible',(data:any) => {
      this.furyPossible = data;
    });
    this.socket.on('lightningPossible',(data:any) => {
      this.lightningPossible = data;
    });
    this.socket.on('eye',(data:any) => {
      this.attackMode = 1;
      
      this.spyInfo = data;
    });
    
    this.socket.on('fury', (data:any) => {
      this.attackMode = 6;
      
      this.furyInfo = data;
    });
    
    this.socket.on('lightning', (data:any) => {
      this.attackMode = 8;
      this.lightningInfo = {'lost_build':[]}
      for(let building in data.lost_build) {
        this.lightningInfo.lost_build.push({
          'code': building,
          'nb': data.lost_build[building]
        });
      }
    });
    
    this.socket.on('spyInfo',(data:any) => {
      this.attackMode = 1;
      
      this.spyInfo = data;
    });
    
    this.socket.on('waveAttackSum',(data:any) => {
      this.attackMode = 3;
      this.waveAttackSum = data;
    });
    
    this.socket.on('realWaveAttackCheck', (data:any) => {
      this.realWaveAttackCheck = data;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('attack');
    this.socket.removeListener('attackList');
    this.socket.removeListener('profile');
    this.socket.removeListener('attackPossible');
    this.socket.removeListener('furyPossible');
    this.socket.removeListener('lightningPossible');
    this.socket.removeListener('eye');
    this.socket.removeListener('fury');
    this.socket.removeListener('lightning');
    this.socket.removeListener('spyInfo');
    this.socket.removeListener('waveAttackSum');
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
  
  getOffensivePower() {
    let result = 0;
    
    if(this.user.info && this.user.info.datas) {
      for(let i in this.waveAttackSum) {
        if(this.waveAttackSum[i] > 0) {
          result += (this.user.info.datas.army[i].attack*this.waveAttackSum[i]);
        }
      }
    }
    
    return result;
  }
  
  prepareAttack(id:number) {
    this.attackMode = 3;
    
    this.socket.emit('profile', id);
    this.socket.emit('attackPossible', id);
    this.socket.emit('waveAttackSum');
  }
  prepareFury(id:number) {
    this.attackMode = 5;
    
    this.socket.emit('profile', id);
  }
  prepareLightning(id:number) {
    this.attackMode = 7;
    
    this.socket.emit('profile', id);
  }
  
  launchAttack(id:number) {
    this.socket.emit('attackPossible', id);
    this.socket.emit('attack', id);
  }
  
  launchFury(id:number) {
    this.socket.emit('fury', id);
  }
  
  launchLightning(id:number) {
    this.socket.emit('lightning', id);
  }
  
  observe(id:number) {
    this.attackMode = 1;
    
    this.socket.emit('profile', id);
    this.socket.emit('furyPossible', id);
    this.socket.emit('lightningPossible', id);
    this.socket.emit('attackPossible', id);
    this.socket.emit('eye', id);
  }
  
  setMenuMode(id:number) {
    switch(id) {
      case 1: 
        this.socket.emit("attackStats");
      break;
      case 2:
        this.socket.emit('diamondInfo');
        this.socket.emit('diamondRankingPlayers');
        this.socket.emit('diamondRankingAlliance');
      break;
    }
    this.menuMode = id;
  }
  
  spy(id:number) {
    this.attackMode = 2;
    
    this.socket.emit('profile', id);
    this.socket.emit('furyPossible', id);
    this.socket.emit('lightningPossible', id);
    this.socket.emit('attackPossible', id);
    this.socket.emit('spyInfo', id);
  }
}
