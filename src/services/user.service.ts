import { Component, Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router'
import { environment } from './../environments/environment';
import { SocketComponent as Socket } from './socketio.service';

declare let facebookConnectPlugin:any;
declare let device:any;

@Component({
  selector: 'app-user',
  template: `
    <ng-content></ng-content>
  `
})

@Injectable()
export class UserComponent {
  config: any;
  info: any;
  init: number;
  newMsg: number;
  
  constructor(private router: Router, private oauthService: OAuthService, private socket: Socket) {
    this.config = {
      'weather': 'sun'
    };
    this.info = {
      'id': 0,
      'mstatus': 0,
      'level': 0,
      'datas': {
        'ress_lvl': 0
      },
      'style': 'default',
      
      'army': {},
      'building': {}
    }
    this.init = 0;
    this.newMsg = 0;
  }
  
  setConfig(data: any) {
    this.config = data;
  }
  
  setInit() {
    this.init = 1;
  }
  
  setUser(user: any) {
    this.info = user;
  }
  
  setUserRess(ress: any) {
    for(let i in ress) {
      this.info[i] = ress[i];
    }
  }
  
  buildTemple1Allowed() {
    return this.getPropertyNb('hermes') + this.getPropertyNb('apollo') +
           this.getPropertyNb('demeter');
  }
  buildTemple2Allowed() {
    if(this.getLevel() < 6) {
      return 1;
    }
    return this.getPropertyNb('ares') + this.getPropertyNb('athena');
  }
  buildTemple3Allowed() {
    if(this.getLevel() < 8) {
      return 1;
    }
    return this.getPropertyNb('artemis') + this.getPropertyNb('dionysus') +
           this.getPropertyNb('hephaestus');
  }
  buildTemple4Allowed() {
    if(this.getLevel() < 10) {
      return 1;
    }
    return this.getPropertyNb('zeus') + this.getPropertyNb('hades') +
           this.getPropertyNb('poseidon');
  }
  
  //Check permissions for the user
  checkPermissions(status:number[]) {
    //Not received the info yet
    if(this.init == 0) {
      return;
    }
    if(!status.includes(this.info.mstatus)) {
      this.router.navigate(['/']);
    }
  }
  
  getArmy() {
    let list = [];
    
    for(let i in this.info.datas.army) {
      //Only if we have the required level or if we have the unit
      if(this.info.level >= this.info.datas.army[i].lvlmini ||
         this.info[i] > 0) {
        this.info.datas.army[i].code = i;
        list.push(this.info.datas.army[i]);
      }
    }
    
    return list;
  }
  
  getBuildings() {
    let list = [];
    
    for(let i in this.info.datas.building) {
      //Only if we have the required level
      if(this.info.level >= this.info.datas.building[i].lvlmini) {
        this.info.datas.building[i].code = i;
        list.push(this.info.datas.building[i]);
      }
    }
    
    return list;
  }
  
  getDatas() {
    return this.info.datas;
  }
  
  getId() {
    return this.info.id;
  }
  
  getLevel() {
    return this.info.level;
  }
  
  getProperty(name:string) {
    if(this.info[name]) {
      return this.info[name];
    }
    else {
      return '';
    }
  }
  
  getPropertyNb(name:any) {
    if(this.info[name]) {
      return this.info[name];
    }
    else {
      return 0;
    }
  }
  
  getConfig() {
    return this.config;
  }
  
  getInit() {
    return this.init;
  }
  
  getQuest() {
    return this.info.quest;
  }
  getQuestValidate() {
    return this.info.quest_validate;
  }
  
  getQuestMax() {
    switch(this.info.level) {
      case 0: return 14;
      case 1: return 14;
      case 2: return 12;
      case 3: return 9;
      case 4: return 10;
      case 5: return 7;
      case 6: return 8;
      case 7: return 7;
      case 8: return 10;
      case 9: return 18;
    }
    
    return 0;
  }
  
  getLevelRess(ress:any) {
    if(this.info.datas && this.info.datas.ress_lvl && this.info.datas.ress_lvl[ress]) {
      return this.info.datas.ress_lvl[ress];
    }
    else {
      return 0;
    }
  }
  
  getSanctuary(sanctuary:any) {
    if(this.info.sanctuary && this.info.sanctuary[sanctuary]) {
      return this.info.sanctuary[sanctuary];
    }
    else {
      return 0;
    }
  }
  getTaxes(ress:any) {
    return this.getPropertyNb('tax_'+ress);
  }
  getVarRess(ress:any) {
    if(this.info.var_ress && this.info.var_ress[ress]) {
      return this.info.var_ress[ress];
    }
    else {
      return 0;
    }
  }
  
  getGoalDays() {
    let cDay = this.getPropertyNb('nbdays') % 100;
    let nb = this.getGoalDaysNb();
    return nb - cDay + this.getPropertyNb('nbdays');
  }
  
  getGoalDaysNb() {
    let nb;
    let cDay = this.getPropertyNb('nbdays') % 100;
    
    if(cDay < 3) {
      nb = 3;
    }
    else if(cDay < 7) {
      nb = 7;
    }
    else if(cDay < 14) {
      nb = 14;
    }
    else if(cDay < 30) {
      nb = 30;
    }
    else if(cDay < 50) {
      nb = 50;
    }
    else if(cDay < 70) {
      nb = 70;
    }
    else{
      nb = 99;
    }
    
    return nb;
  }
  
  hasLevelRess(ress:string) {
    if(this.info.datas && this.info.datas.ress_lvl && 
       this.getPropertyNb('level') >= this.info.datas.ress_lvl[ress]) {
      return true;
    }
    else {
      return false;
    }
  }
  
  hasTemples() {
    return this.getPropertyNb('zeus') + this.getPropertyNb('hades') +
           this.getPropertyNb('poseidon');
  }
  
  setNewMsg(nb:number) {
    let previous = this.newMsg;
    this.newMsg = nb;
    
    if(previous >= this.newMsg) {
      return 0
    }
    else {
      return 1;
    }
  }
  getNewMsg() {
    return this.newMsg;
  }
  
  oauthFB() {
    if(environment.mobile == 0) {
      let clientId = environment.facebook.client_id;
      let redirectURI = this.config.url+'/auth/facebook/';
      
      window.location.href = 'https://www.facebook.com/v10.0/dialog/oauth'+
                             '?client_id='+clientId +
                             '&redirect_uri='+ redirectURI +
                             '&scope=email&response_type=token';
    }
    else {
      facebookConnectPlugin.login(["public_profile"],
        () => {
          facebookConnectPlugin.getAccessToken((token:any) => {
            this.socket.emit('mobileFB', {
              'token': token
            });
          });
        },
        function (error:any) {
          alert(error)
        }
      );
    }
  }
  
  oauthGoogle() {
    if(environment.mobile == 0) {
      this.oauthService.initImplicitFlow();
    }
    //Native Cordova plugin
    else if(device.platform == 'Android' || device.platform == 'iOS') {
      let w:any = window;
       w['plugins'].googleplus.login({
        'scopes': 'profile email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        'webClientId': environment.google.client_id
      },
      (obj:any) => {
        this.socket.emit('mobileGoogle', {'token': obj.idToken});
      },
      (msg:any) => {
        alert('error: ' + msg);
      });
    }
    else {
      this.socket.emit('oauth2Server');
    }
  }
  
  disconnect() {
    let localToken = localStorage.getItem('token');
    localStorage.removeItem('token');
    this.socket.emit('deconnection', localToken);
    
    this.info.id = 0;
    this.info.mstatus = 0;
    
    this.router.navigate(['/']);
  }
  
  reload() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}
