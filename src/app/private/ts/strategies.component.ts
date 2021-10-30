import { Component, Output, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import shieldShaded from '@iconify/icons-bi/shield-shaded';
import swordIcon from '@iconify/icons-vaadin/sword';

@Component({
  templateUrl: '../html/strategies.component.html',
})

export class StrategiesComponent implements OnInit, OnDestroy {
  @Output() public armyInfo:any
            public buildingInfo:any;
  
  public type:any;
  
  public waveAttackDropList:any;
  public waveAttackList:any;
  public waveAttackPower:number;
  public waveAttackUnit:any;
  
  public waveDefenseDropList:any;
  public waveDefenseList:any;
  public waveDefensePower:number;
  public waveDefenseUnit:any;
  public defenseWallStrength:number;
  public wallDefense:number;
  
  public waveAttackMax:number;
  public waveDefenseMax:number;
  
  shieldShaded = shieldShaded;
  swordIcon= swordIcon;
  
  constructor(private socket: Socket, private route: ActivatedRoute,
              public user: User, public translate: TranslateService) {
    this.buildingInfo = { code: 'mint' };
    this.armyInfo = { code: 'spartan' };
    
    this.waveAttackList = [];
    this.waveAttackPower  = 0;
    
    this.waveDefenseList = [];
    this.waveDefensePower = 0;
    this.defenseWallStrength = 0;
    this.wallDefense = 0;
    
    this.type = '';
    
    //How many waves, maximum
    this.waveAttackMax = 10;
    this.waveDefenseMax = 10;
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.type = this.route.snapshot.paramMap.get('type');
    
    if(this.type && this.type == 'defense') {
      this.socket.emit("waveDefenseList");
      this.socket.emit('defenseWallStrength');
      this.socket.emit('wallDefense');
    }
    else {
      this.socket.emit("waveAttackList");
    }
    
    this.socket.on('waveAttackList', (data:any) => {
      if(data.list.length > 0) {
        this.waveAttackProcess(data);
      }
      else {
        this.waveAttackList = [''];
        this.waveAttackUnit = {};
        
        this.waveAttackDropList = ['wave-attack-0', 'wave-attack-1'];
      }
    });
    
    this.socket.on('waveDefenseList', (data:any) => {
      if(data.list.length > 0) {
        this.waveDefenseProcess(data);
      }
      else {
        this.waveDefenseList = [''];
        this.waveDefenseUnit = {};
        
        this.waveDefenseDropList = ['wave-defense-0', 'wave-defense-1'];
      }
    });

    this.socket.on('defenseWallStrength', (data:number) => {
      this.defenseWallStrength = data;
    });
    this.socket.on('wallDefense', (data:number) => {
      this.wallDefense = data;
    });
    this.socket.on('engage', () => {
      this.socket.emit("waveAttackList");
      this.socket.emit("waveDefenseList");
    }); 
    this.socket.on('waveRefresh', () => {
      this.socket.emit("waveAttackList");
      this.socket.emit("waveDefenseList");
    }); 
  }
  
  ngOnDestroy() {
    this.socket.removeListener('engage');
    this.socket.removeListener('defenseWallStrength');
    this.socket.removeListener('wallDefense');
    this.socket.removeListener('waveAttackList');
    this.socket.removeListener('waveDefenseList');
    this.socket.removeListener('waveRefresh');
  }
  
  onDropAttack(event: CdkDragDrop<string[]>) {
    let wavePrevious = parseInt(event.previousContainer.id.split('-')[2]);
    let waveNew      = parseInt(event.container.id.split('-')[2]);
    let unit         = event.item.element.nativeElement.id.split('-')[0];
    let nb           = this.user.getPropertyNb(unit);
    
    if(this.waveAttackUnit[unit]) {
      nb -= this.waveAttackUnit[unit];
    }
    
    if(wavePrevious == waveNew) {
      return;
    }
    
    if(wavePrevious == 0) {
      let msg = {
        'unit':unit,
        'wave': waveNew,
        'nb': nb
      };
      this.socket.emit('waveAttackNew', msg);
      this.waveAttackUnit[unit] = this.user.getPropertyNb(unit);
    }
    else if(waveNew == 0) {
      let msg = {
        'unit': unit,
        'wave': wavePrevious
      };
      this.socket.emit("waveAttackDelete", msg);
    }
    else {
      let msg = {
        'unit': unit,
        'previous': wavePrevious,
        'wave': waveNew
      };
      this.socket.emit("waveAttackMove", msg);
    }
  }
  
  onDropDefense(event: CdkDragDrop<string[]>) {
    let wavePrevious = parseInt(event.previousContainer.id.split('-')[2]);
    let waveNew      = parseInt(event.container.id.split('-')[2]);
    let unit         = event.item.element.nativeElement.id.split('-')[0];
    let nb           = this.user.getPropertyNb(unit);
    
    if(this.waveDefenseUnit[unit]) {
      nb -= this.waveDefenseUnit[unit];
    }
    
    if(wavePrevious == waveNew) {
      return;
    }
    
    if(wavePrevious == 0) {
      let msg = {
        'unit':unit,
        'wave': waveNew,
        'nb': nb
      };
      this.socket.emit('waveDefenseNew', msg);
      this.waveDefenseUnit[unit] = this.user.getPropertyNb(unit);
    }
    else if(waveNew == 0) {
      let msg = {
        'unit': unit,
        'wave': wavePrevious
      };
      this.socket.emit("waveDefenseDelete", msg);
    }
    else {
      let msg = {
        'unit': unit,
        'previous': wavePrevious,
        'wave': waveNew
      };
      this.socket.emit("waveDefenseMove", msg);
    }
  }
  
  selectArmy(name:string) {
    this.armyInfo = this.user.info.datas.army[name];
    this.armyInfo.engageNb   = '';
    this.armyInfo.liberatenb = '';
    this.armyInfo.resale     = {};
    this.armyInfo.rEngageNb      = 0;
    this.armyInfo.rLiberateNb    = 0;
    this.armyInfo.rEngagePossible= 0;
    this.armyInfo.error          = 0; 
    
    this.socket.emit('engagePossible', name);
    
    for(let res in this.armyInfo.cost) {
      this.armyInfo.resale[res] = this.armyInfo.cost[res]*0.6;
    }
  }
  selectBuilding(name:string) {
    this.buildingInfo = this.user.info.datas.building[name];
    this.buildingInfo.buildNb    = '';
    this.buildingInfo.destructNb = '';
    this.buildingInfo.destruct   = {};
    this.buildingInfo.rBuildNb       = 0;
    this.buildingInfo.rDestructNb    = 0;
    this.buildingInfo.rBuildPossible = 0;
    this.buildingInfo.errorBuilding  = 0;
    
    this.socket.emit('buildPossible', name);
    
    for(let res in this.buildingInfo.cost) {
      this.buildingInfo.destruct[res] = this.buildingInfo.cost[res]*0.6;
    }
  }
  
  waveAttackProcess(data:any) {
    this.waveAttackList  = data.list;
    this.waveAttackPower = data.power;
    this.waveAttackUnit  = {};
    
    this.waveAttackDropList = [];
    this.waveAttackDropList.push('wave-attack-0');
    
    var waveNb = data.list.length;
    for(let i=1;i<=waveNb;i++) {
      for(let unit in this.waveAttackList[i]) {
        if(this.waveAttackList[i].hasOwnProperty(unit)) {
          if(!this.waveAttackUnit[unit]) {
            this.waveAttackUnit[unit] = 0;
          }
          this.waveAttackUnit[unit] += this.waveAttackList[i][unit];
        }
      }
      this.waveAttackDropList.push('wave-attack-'+i);
    }
    if(data.list.length < this.waveAttackMax) {
      this.waveAttackDropList.push('wave-attack-'+data.list.length);
    }
  }
  
  waveDefenseProcess(data:any) {
    this.waveDefenseList = data.list;
    this.waveDefensePower= data.power;
    this.waveDefenseUnit = {};
    
    this.waveDefenseDropList = [];
    this.waveDefenseDropList.push('wave-defense-0');
    
    var waveNb = data.list.length;
    for(var i=1;i<=waveNb;i++) {
      for(var unit in this.waveDefenseList[i]) { 
        if(this.waveDefenseList[i].hasOwnProperty(unit)) {
          if(!this.waveDefenseUnit[unit]) {
            this.waveDefenseUnit[unit] = 0;
          }
          this.waveDefenseUnit[unit] += this.waveDefenseList[i][unit];
        }
      }
      this.waveDefenseDropList.push('wave-defense-'+i);
    }
    if(data.list.length < this.waveDefenseMax) {
      this.waveDefenseDropList.push('wave-defense-'+data.list.length);
    }
  }
  
  waveAttackDelete(unit:string, wave:number) {
    let msg = {
      'unit': unit,
      'wave': wave
    };
    this.socket.emit("waveAttackDelete", msg);
  }
  
  waveDefenseDelete(unit:string, wave:number) {
    let msg = {
      'unit': unit,
      'wave': wave
    };
    this.socket.emit("waveDefenseDelete", msg);
  }
  
}
