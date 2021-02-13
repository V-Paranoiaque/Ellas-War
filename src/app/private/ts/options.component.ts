import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/options.component.html',
  styleUrls: ['../css/options.component.css']
})

export class Options {
  private accountRenameCost:number;
  private renameError: number;
  
  public newusername: string;
  
  constructor(private socket: Socket, public user: User) {
    if(user.getLevel() >= 1) {
      this.accountRenameCost = 1;
    }
    else {
      this.accountRenameCost = 0;
    }
    this.renameError = 0;
    this.newusername = '';
    
    this.socket.socket.on('accountRenameCost', (result:number) => {
      this.accountRenameCost = result;
    });
    
    this.socket.socket.on("accountRename", (result:any) => {
      this.socket.emit('accountRenameCost');
      this.renameError = result;
    });
  }
  
  ngOnInit() {
    setTimeout(() => {
      this.socket.emit('accountRenameCost');
    }, 0);
  }
  
  accountRename() {
    this.socket.emit('accountRename', this.newusername);
    this.newusername = '';
  }
  
  reset() {
    this.socket.emit('reset');
  }
  
  getAccountRenameCost() {
    return this.accountRenameCost;
  }
  getRenameError() {
    return this.renameError;
  }
}
