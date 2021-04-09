import { Component  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';

import { environment } from './../../../environments/environment';

import fileAlt from '@iconify/icons-fa-solid/file-alt';
import flag from '@iconify/icons-fa-solid/flag';
import swordIcon from '@iconify/icons-vaadin/sword';
import userPlus from '@iconify/icons-fa-solid/user-plus';
import users from '@iconify/icons-fa-solid/users';

@Component({
  templateUrl: '../html/diplomacy.component.html'
})

export class Diplomacy {
  
  public allianceList:any;
  public allianceProfile:any;
  public allianceWait:any;
  public order:string;
  
  fileAlt  = fileAlt;
  flag     = flag;
  swordIcon= swordIcon;
  userPlus = userPlus;
  users    = users;
  
  constructor(private router: Router, private http: HttpClient, private socket: Socket, public user: User) {
    this.allianceList = '';
    this.allianceProfile = {
      'alliance_name': ''
    }
    this.allianceWait = '';
    this.order = '';
  }
  
  ngOnInit() {
    this.socket.emit('allianceList', this.order);
    this.socket.emit('allianceWait');
    
    this.socket.on('allianceList', (data:any) => {
      this.allianceList = data;
    });
    this.socket.on('allianceListReload', () => {
      this.socket.emit('allianceList', this.order);
    });
    this.socket.on('allianceNew', (data:number) => {
      if(data == 1) {
        this.router.navigate(['/alliance'])
      }
    });
    this.socket.on('allianceRankingRefresh', () => {
      this.socket.emit('allianceList', this.order);
    });
    this.socket.on('allianceWait', (data:number) => {
      this.allianceWait = data;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('allianceList');
    this.socket.removeListener('allianceListReload');
    this.socket.removeListener('allianceNew');
    this.socket.removeListener('allianceRankingRefresh');
    this.socket.removeListener('allianceWait');
  }
  
  allianceWaitCancel = () => {
    this.socket.emit('allianceWaitCancel');
  }
  
  getProfile(id:number) {
    let _url = environment.SOCKET_ENDPOINT+'/api/allianceProfile/'+id+'.json';
    
    this.http.get(_url).subscribe((res:any) => {
      if(res) {
        this.allianceProfile = res;
      }
    });
  }
  
  setJoin(alliance:any) {
    this.allianceProfile = alliance;
  }
}
