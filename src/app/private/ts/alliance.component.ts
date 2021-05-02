import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import brushIcon from '@iconify/icons-bi/brush';
import cog from '@iconify/icons-fa-solid/cog';
import coinBagSolid from '@iconify-icons/clarity/coin-bag-solid';
import eye from '@iconify/icons-fa-solid/eye';
import filePaper2Line from '@iconify-icons/ri/file-paper-2-line';
import flag from '@iconify/icons-fa-solid/flag';
import handHolding from '@iconify/icons-fa-solid/hand-holding';
import swordIcon from '@iconify/icons-vaadin/sword';
import times from '@iconify/icons-fa-solid/times';
import sportsMedal from '@iconify-icons/emojione-monotone/sports-medal';

@Component({
  templateUrl: '../html/alliance.component.html'
})

export class Alliance {
  
  public allianceProfile:any;
  public allowDissolve:any;
  public allowLeave:any;
  public myAllianceMembers:any;
  public myAllianceProfile:any;
  public myAllianceWar:any;
  public myAllianceWaitList:any;
  public myAllianceWaitNb:any;
  public pactList:any;
  public ressList:any;
  public selectedPlayer:any;
  public selectedRequest:any;
  public selectedWar:any;
  public taxes:any;
  
  brushIcon     = brushIcon;
  cog           = cog;
  coinBagSolid  = coinBagSolid;
  eye           = eye;
  filePaper2Line= filePaper2Line;
  flag          = flag;
  handHolding   = handHolding;
  swordIcon     = swordIcon;
  times         = times;
  sportsMedal   = sportsMedal;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.allianceProfile = {}
    this.myAllianceProfile = {}
    this.myAllianceWaitList = [];
    this.myAllianceWar = [];
    this.pactList = [];
    this.ressList = environment.resources;
    this.selectedPlayer = {};
    this.selectedRequest = {};
    this.selectedWar = {};
    this.taxes = {};
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.socket.emit('alliancePactListAll');
    
    this.socket.emit('myAllianceProfile');
    this.socket.emit('myAllianceMembers');
    this.socket.emit('myAllianceAllowLeave');
    this.socket.emit('myAllianceAllowDissolve');
    this.socket.emit('myAllianceWaitList');
    this.socket.emit('myAllianceWar');
    
    this.socket.on('allianceMembersRefresh', () => {
      this.socket.emit('myAllianceMembers');
      this.socket.emit('myAllianceAllowLeave');
    });
    this.socket.on('alliancePactAsk', () => {
      this.socket.emit('alliancePactListAll');
    });
    this.socket.on('alliancePactListAll', (data:any) => {
      this.pactList = data;
    });
    this.socket.on('myAllianceProfile', (data:any) => {
      this.myAllianceProfile = data;
    });
    this.socket.on('myAllianceProfileRefresh', () => {
      this.socket.emit('myAllianceProfile');
    });
    this.socket.on('myAllianceMembers', (data:any) => {
      this.myAllianceMembers = data;
    });
    this.socket.on('myAllianceAllowLeave', (data:any) => {
      this.allowLeave = data;
    });
    this.socket.on('myAllianceWar', (data:any) => {
      this.myAllianceWar = data;
    });
    this.socket.on('myAllianceAllowDissolve', (data:any) => {
      this.allowDissolve = data;
    });
    this.socket.on('myAllianceMembersRefresh', () => {
      this.socket.emit('myAllianceMembers');
      this.socket.emit('myAllianceAllowLeave');
    });
    this.socket.on('myAllianceAllowLeaveRefresh', () => {
      this.socket.emit('myAllianceAllowLeave');
      this.socket.emit('myAllianceAllowDissolve');
    });
    this.socket.on('myAllianceAllowDissolveRefresh', () => {
      this.socket.emit('myAllianceAllowLeave');
      this.socket.emit('myAllianceAllowDissolve');
    });
    this.socket.on('myAllianceWaitList', (data:any) => {
      this.myAllianceWaitList = data;
    });
    this.socket.on('myAllianceWaitListRefresh', () => {
      this.socket.emit('myAllianceWaitList');
    });
    this.socket.on('myAllianceWaitNb', (data:any) => {
      this.myAllianceWaitNb = data;
    });
    this.socket.on('myAllianceWaitNbRefresh', () => {
      this.socket.emit('myAllianceWaitNb');
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('allianceMembersRefresh');
    this.socket.removeListener('alliancePactAsk');
    this.socket.removeListener('alliancePactListAll');
    
    this.socket.removeListener('myAllianceProfile');
    this.socket.removeListener('myAllianceProfileRefresh');
    this.socket.removeListener('myAllianceMembers');
    this.socket.removeListener('myAllianceAllowLeave');
    this.socket.removeListener('myAllianceWar');
    this.socket.removeListener('myAllianceAllowDissolve');
    this.socket.removeListener('myAllianceMembersRefresh');
    this.socket.removeListener('myAllianceAllowLeaveRefresh');
    this.socket.removeListener('myAllianceAllowDissolveRefresh');
    this.socket.removeListener('myAllianceWaitList');
    this.socket.removeListener('myAllianceWaitListRefresh');
    this.socket.removeListener('myAllianceWaitNb');
    this.socket.removeListener('myAllianceWaitNbRefresh');
  }
  
  getProfile() {
    this.socket.emit('myAllianceProfile');
  }
  
  setAlliance(info:any) {
    this.allianceProfile = info;
  }
  
  setPlayer(user:any, type:number) {
    this.selectedPlayer = { ...user };
    this.selectedPlayer.help = 0;
    
    if(type == 1) {
      this.socket.emit('myAllianceGiftRemain', user.membre_id);
    }
  }
  
  setRequest(res:any) {
    this.selectedRequest = {
      'resource': res,
      'quantity': ''
    }
    this.socket.emit('myAllianceAskList');
    this.socket.emit('myAllianceAskMy');
  }
  
  taxesInit() {
    this.taxes = {}
    for(let i in environment.resources) {
      this.taxes[environment.resources[i]] = this.myAllianceProfile['tax_'+environment.resources[i]]
    }
  }
  
  warSelect(war:any) {
    this.selectedWar = war;
    
    this.socket.emit('myAllianceWarHistory', {
      attacking: war.alliance_attacking,
      defender: war.alliance_defender
    });
  }
}
