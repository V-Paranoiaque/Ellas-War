import { Component, OnInit, OnDestroy  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

import fileAlt from '@iconify/icons-fa-solid/file-alt';
import flag from '@iconify/icons-fa-solid/flag';
import swordIcon from '@iconify/icons-vaadin/sword';
import userPlus from '@iconify/icons-fa-solid/user-plus';
import users from '@iconify/icons-fa-solid/users';

@Component({
  templateUrl: '../html/diplomacy.component.html'
})

export class DiplomacyComponent implements OnInit, OnDestroy {
  
  public allianceList:any;
  public allianceProfile:any;
  public allianceWait:any;
  public order:string;
  private sub:any;
  
  fileAlt  = fileAlt;
  flag     = flag;
  swordIcon= swordIcon;
  userPlus = userPlus;
  users    = users;
  
  constructor(private router: Router, private http: HttpClient, private socket: Socket, public user: User, public translate: TranslateService) {
    this.allianceList = '';
    this.allianceProfile = {
      'alliance_name': ''
    }
    this.allianceWait = '';
    this.order = '';
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
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
    this.socket.on('alliancePactAsk', () => {
      this.socket.emit('alliancePactList');
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
    this.socket.removeListener('alliancePactAsk');
    this.socket.removeListener('allianceRankingRefresh');
    this.socket.removeListener('allianceWait');
    
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }
  
  allianceListOrder(order:string) {
    this.order = order;
    this.socket.emit("allianceList", this.order);
  }
  
  allianceWaitCancel() {
    this.socket.emit('allianceWaitCancel');
  }
  
  getProfile(id:number) {
    let url = this.socket.url+'/api/allianceProfile/'+id+'.json';
    
    this.sub = this.http.get(url).subscribe((res:any) => {
      if(res) {
        this.allianceProfile = res;
      }
    });
  }
  
  setAlliance(alliance:any) {
    if(alliance.pact_id) {
      this.socket.emit('alliancePactInfo', alliance.pact_id);
    }
    this.allianceProfile = alliance;
    this.allianceProfile.started = 0;
  }
}
