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
  public image:any;
  public imageProfile:any;
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
    this.imageProfile = '';
    this.location = '';
    this.newEmail = '';
    this.newusername = '';
    this.pauseAllowed = 0;
    this.pauseNb = 4;
    
    this.sound = this.user.getPropertyNb('sound');
    this.currentStyle = this.user.getProperty('style');
  }
  
  ngOnInit() {
    this.sound = this.user.getPropertyNb('sound');
    
    this.currentStyle = this.user.getProperty('style');
    
    this.socket.on('accountImg', (name:any) => {
      this.imageProfile = name;
    });
    this.socket.on('accountInfo', (info:any) => {
      this.imageProfile = info.membre_img;
      this.location     = info.location;
      this.description  = info.description;
    });
    this.socket.on('accountRenameCost', (result:number) => {
      this.accountRenameCost = result;
    });
    
    this.socket.on("accountRename", (result:any) => {
      this.socket.emit('accountRenameCost');
      this.renameError = result;
    });
    this.socket.on("pauseAllowed", (result:any) => {
      this.pauseAllowed = result;
    });
    this.socket.on('reset', () => {
      document.location.href="/";
    });
    this.socket.on('soundModify', (sound:number) => {
      this.sound = sound;
    });
    
    setTimeout(() => {
      this.socket.emit('accountInfo');
      this.socket.emit('accountRenameCost');
      this.socket.emit('pauseAllowed');
    }, 0);
  }
  
  ngOnDestroy() {
    this.socket.removeListener('accountInfo');
    this.socket.removeListener('accountRenameCost');
    this.socket.removeListener('accountRename');
    this.socket.removeListener('pauseAllowed');
    this.socket.removeListener('reset');
    this.socket.removeListener('soundModify');
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
      this.socket.emit('accountEmail', this.newEmail);
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
    let msg = {
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
  
  uploadImage(event:any){
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      let name = event.target.files[0].name;
      
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any) => {
        let playerImage = {
          'name': name,
          'data': event.target.result
        };
        this.socket.emit('accountImgUpload', playerImage)
        this.image = '';
      }
    }
  }
}
