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
  public errorAccountSave: number;
  
  public currentStyle:string;
  public description:string;
  public location:string;
  public newEmail: string;
  public newusername: string;
  public pauseAllowed: number;
  public pauseNb: number;
  public sound: number;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    if(user.getLevel() >= 1) {
      this.accountRenameCost = 1;
    }
    else {
      this.accountRenameCost = 0;
    }
    
    this.errorAccountSave = 0;
    this.renameError = 0;
    this.emailError = 0;
    
    this.description = '';
    this.location = '';
    this.newEmail = '';
    this.newusername = '';
    this.pauseAllowed = 0;
    this.pauseNb = 4;
    this.sound = user.getPropertyNb('sound');
    
    this.currentStyle = this.user.getProperty('style');
    
    this.socket.socket.on('accountInfo', (info:any) => {
      this.location = info.location;
      this.description = info.description;
    });
    this.socket.socket.on('accountRenameCost', (result:number) => {
      this.accountRenameCost = result;
    });
    
    this.socket.socket.on("accountRename", (result:any) => {
      this.socket.emit('accountRenameCost');
      this.renameError = result;
    });
    this.socket.socket.on("pauseAllowed", (result:any) => {
      this.pauseAllowed = result;
    });
    this.socket.socket.on('reset', () => {
      document.location.href="/";
    });
    this.socket.socket.on('soundModify', (sound:number) => {
      this.sound = sound;
    });
  }
  
  ngOnInit() {
    setTimeout(() => {
      this.socket.emit('accountInfo');
      this.socket.emit('accountRenameCost');
      this.socket.emit('pauseAllowed');
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
  
  accountPause() {
    if(this.pauseNb >= 4 && this.pauseNb <= 100) {
      this.socket.emit('pause', this.pauseNb);
    }
  }
  
  accountRename() {
    this.socket.emit('accountRename', this.newusername);
    this.newusername = '';
  }
  
  accountSave() {
    this.errorAccountSave = 1;
    var msg = {
      location: this.location,
      description: this.description
    };
    
    this.socket.emit('accountModify', msg);
    
    setTimeout(() => {
      this.errorAccountSave = 0;
    }, 3000);
  }
  
  parametersLoad() {
    this.currentStyle = this.user.getProperty('style');
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
