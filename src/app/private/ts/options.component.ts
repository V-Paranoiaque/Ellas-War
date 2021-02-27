import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/options.component.html',
  styleUrls: ['../css/options.component.css']
})

export class Options {
  private accountRenameCost:number;
  
  private renameError: number;
  public emailError: number;
  
  public currentStyle:string;
  public newEmail: string;
  public newusername: string;
  public sound: number;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    if(user.getLevel() >= 1) {
      this.accountRenameCost = 1;
    }
    else {
      this.accountRenameCost = 0;
    }
    
    this.renameError = 0;
    this.emailError = 0;
    
    this.newEmail = '';
    this.newusername = '';
    this.sound = user.getPropertyNb('sound');
    
    //TODO: load from the user's info
    this.currentStyle = 'default';
    
    this.socket.socket.on('accountRenameCost', (result:number) => {
      this.accountRenameCost = result;
    });
    
    this.socket.socket.on("accountRename", (result:any) => {
      this.socket.emit('accountRenameCost');
      this.renameError = result;
    });
      
    this.socket.socket.on('soundModify', (sound:number) => {
      this.sound = sound;
    });
  }
  
  ngOnInit() {
    setTimeout(() => {
      this.socket.emit('accountRenameCost');
    }, 0);
  }
  
  getAccountRenameCost() {
    return this.accountRenameCost;
  }
  getRenameError() {
    return this.renameError;
  }
  
  accountEmail() {
    this.emailError = 0;
    if(this.newEmail) {
      this.socket.socket.emit('accountEmail', this.newEmail);
    }
    else {
      this.emailError = 1;
    }
  }
  
  accountRename() {
    this.socket.emit('accountRename', this.newusername);
    this.newusername = '';
  }
  
  reset() {
    this.socket.emit('reset');
  }
  
  soundModify() {
    this.socket.emit('soundModify', this.sound);
  }
  
  styleChange(event:any) {
    let style = event.target.value;
    this.socket.emit('styleModify', style);
  }
}
