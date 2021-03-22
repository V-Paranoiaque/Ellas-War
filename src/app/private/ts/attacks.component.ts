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
import plusIcon from '@iconify/icons-bi/plus';
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
  public sanctuariesAttackInfo:any;
  public sanctuariesDefense:any;
  public sanctuariesList:any;
  public sanctuariesSpyInfo:any;
  public sanctuariesInfo:any;
  public sanctuariesWave:any[];
  public sanctuariesWaveTab:any;
  
  Object = Object;
  parseInt = parseInt;
  
  //Icons
  boltIcon   = boltIcon;
  dotCircle  = dotCircle;
  eyeIcon    = eyeIcon;
  fireIcon   = fireIcon;
  fistRaised = fistRaised;
  gemIcon    = gemIcon;
  plusIcon   = plusIcon;
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
     * 9: Spy sanctuary
     *10: Attack sanctuary
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
    
    this.diamondInfo = {};
    this.diamondRankingPlayers = [];
    this.diamondRankingAlliance = [];
    this.realWaveAttackCheck = {
      'ress': {},
      'habitation': {}
    };
    this.sanctuariesList = [];
    this.sanctuariesSpyInfo = {};
    this.sanctuariesAttackInfo = {};
    this.sanctuariesDefense = [];
    this.sanctuariesWave = []
    this.sanctuariesWaveTab = [];
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
      this.waveAttackSum = data;
      let newTab = [];
      let j = 0;
      for(let i in this.waveAttackSum) {
        if(this.waveAttackSum[i] > 0) {
          newTab.push(j)
          j++;
        }
      }
      if(this.sanctuariesWaveTab.length != newTab.length) {
        this.sanctuariesWaveTab = newTab;
      }
    });
    
    this.socket.on('realWaveAttackCheck', (data:any) => {
      this.realWaveAttackCheck = data;
    });
    
    this.socket.on('sanctuariesList', (data:any) => {
      this.sanctuariesList = data;
    });
    this.socket.on('sanctuariesAttack', (data:any) => {
      this.attackMode = 11;
      this.sanctuariesAttackInfo = data;
    });
    this.socket.on('sanctuariesEye', (data:any) => {
      this.attackMode = 9;
      this.sanctuariesSpyInfo = data;
    });
    this.socket.on('sanctuariesDefense', (data:any) => {
      this.sanctuariesDefense = data;
      this.socket.emit('waveAttackSum');
    });
    this.socket.on('sanctuariesSpy', (data:any) => {
      this.attackMode = 9;
      this.sanctuariesSpyInfo = data;
    });
    this.socket.on('sanctuariesInfo', (data:any) => {
      this.sanctuariesInfo = data;
      if(data.membre_id == this.user.getId()) {
        this.attackMode = 12;
      }
      else {
        this.attackMode = 9;
      }
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('attackStats');
    this.socket.removeListener('attack');
    this.socket.removeListener('attackList');
    this.socket.removeListener('profile');
    this.socket.removeListener('attackPossible');
    this.socket.removeListener('furyPossible');
    this.socket.removeListener('lightningPossible');
    this.socket.removeListener('eye');
    this.socket.removeListener('fury');
    this.socket.removeListener('lightning'); 
    this.socket.removeListener('sanctuariesAttack');
    this.socket.removeListener('sanctuariesEye');
    this.socket.removeListener('sanctuariesDefense');
    this.socket.removeListener('sanctuariesInfo');
    this.socket.removeListener('sanctuariesList');
    this.socket.removeListener('sanctuariesSpy');
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
  
  getSanctuariesDefense() {
    let list:any = [];
    
    for(let i in this.sanctuariesDefense) {
      if(this.sanctuariesDefense[i]) {
        for(let unit in this.sanctuariesDefense[i]) {
          if(this.sanctuariesDefense[i][unit] > 0) {
            list.push({
              'unit': unit,
              'nb': this.sanctuariesDefense[i][unit]
            });
          }
        }
      }
    }
    
    return list;
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
  sanctuariesAttack(id:number) {
    this.attackMode = 11;
    this.socket.emit('sanctuariesAttack', id);
  }
  sanctuariesPrepareUnit(id:number, nb:number) {
    this.sanctuariesWave[id] = nb;
  }
  sanctuariesEye(id:number) {
    this.socket.emit('sanctuariesEye', id);
  }
  sanctuaryManage(id:number) {
    this.socket.emit('realWaveAttackCheck');
    this.socket.emit('sanctuariesInfo', id);
    this.socket.emit('sanctuariesDefense', id);
  }
  
  sanctuariesPrepare(id:number) {
    this.attackMode = 10;
    this.socket.emit('waveAttackSum');
    this.socket.emit('sanctuariesInfo', id);
  }
  sanctuariesSpy(id:number) {
    this.socket.emit('sanctuariesSpy', id);
  }
  
  setMenuMode(id:number) {
    switch(id) {
      case 1:
      break;
      case 2:
        this.socket.emit('diamondInfo');
        this.socket.emit('diamondRankingPlayers');
        this.socket.emit('diamondRankingAlliance');
      break;
      case 3:
        this.socket.emit('sanctuariesList');
        this.socket.emit('waveAttackSum');
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
  
  waveNew(i:number, nb:number) {
    let army = this.getArmy()[i];
    let unit = army.unit
    if(nb > 0 && nb <= army.nb) {
      var msg = {
        'unit':unit,
        'wave': 1,
        'nb': nb,
        'sanctuary': this.sanctuariesInfo.sanctuaries_id
      };
      this.socket.emit('sanctuariesWaveNew', msg);
      this.sanctuariesWave[i] = '';
    }
  }
}
