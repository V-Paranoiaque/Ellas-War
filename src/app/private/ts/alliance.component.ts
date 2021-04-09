import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';

import times from '@iconify/icons-fa-solid/times';

@Component({
  templateUrl: '../html/alliance.component.html',
  styleUrls: ['../css/alliance.component.css']
})

export class Alliance {
  
  public allowDissolve:any;
  public allowLeave:any;
  public myAllianceMembers:any;
  public myAllianceProfile:any;
  public myAllianceWar:any;
  
  times = times;
  
  constructor(private socket: Socket, public user: User) {
    this.myAllianceProfile = {}
  }
  
  ngOnInit() {
    this.socket.emit('myAllianceProfile');
    this.socket.emit('myAllianceMembers');
    this.socket.emit('myAllianceAllowLeave');
    this.socket.emit('myAllianceAllowDissolve');
    this.socket.emit('myAllianceWar');
    
    this.socket.on('myAllianceProfile', (data:any) => {
      this.myAllianceProfile = data;
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
    this.socket.on('myAllianceMembersRefresh', (data:any) => {
      this.socket.emit('myAllianceMembers');
      this.socket.emit('myAllianceAllowLeave');
    });
    this.socket.on('myAllianceAllowLeaveRefresh', (data:any) => {
      this.socket.emit('myAllianceAllowLeave');
      this.socket.emit('myAllianceAllowDissolve');
    });
    this.socket.on('myAllianceAllowDissolveRefresh', (data:any) => {
      this.socket.emit('myAllianceAllowLeave');
      this.socket.emit('myAllianceAllowDissolve');
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('myAllianceProfile');
    this.socket.removeListener('myAllianceMembers');
    this.socket.removeListener('myAllianceAllowLeave');
    this.socket.removeListener('myAllianceWar');
    this.socket.removeListener('myAllianceAllowDissolve');
    this.socket.removeListener('myAllianceMembersRefresh');
    this.socket.removeListener('myAllianceAllowLeaveRefresh');
    this.socket.removeListener('myAllianceAllowDissolveRefresh');
  }
}
