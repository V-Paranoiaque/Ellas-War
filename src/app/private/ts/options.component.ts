import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import cog from '@iconify/icons-fa-solid/cog';
import email from '@iconify/icons-mdi/email';
import history from '@iconify/icons-fa-solid/history';
import idBadge from '@iconify/icons-fa-solid/id-badge';
import key from '@iconify/icons-fa-solid/key';
import userCircle from '@iconify/icons-fa-solid/user-circle';
import redo from '@iconify/icons-fa-solid/redo';

@Component({
  templateUrl: '../html/options.component.html',
  styleUrls: ['../css/options.component.css']
})

export class OptionsComponent implements OnInit, OnDestroy {
  public accountPasswordPossible:number;
  private accountRenameCost:number;
  
  private renameError: number;
  public emailError: number;
  public passwordError: number;
  public errorAccountSave: number;
  
  public confirm:string;
  public currentLanguage:string;
  public currentStyle:string;
  public description:string;
  public image:any;
  public imageProfile:any;
  public location:string;
  public newEmail: string;
  public newPassword: string;
  public newusername: string;
  public oldPassword: string;
  public pauseAllowed: number;
  public pauseNb: number;
  public sound: number;
  
  cog        = cog;
  email      = email;
  history    = history;
  idBadge    = idBadge;
  key        = key;
  userCircle = userCircle;
  redo       = redo;
  
  constructor(private socket: Socket, public user: User, private router: Router,
              public translate: TranslateService) {
    this.user.checkPermissions([1,2,3,4,5]);
    
    this.accountPasswordPossible = 0;
    if(user.getLevel() >= 1) {
      this.accountRenameCost = 1;
    }
    else {
      this.accountRenameCost = 0;
    }
    
    this.errorAccountSave = 0;
    this.renameError = 0;
    this.emailError = 0;
    this.passwordError = 0;
    
    this.confirm = '';
    this.description = '';
    this.imageProfile = '';
    this.location = '';
    this.newEmail = '';
    this.newPassword = '';
    this.newusername = '';
    this.oldPassword = '';
    this.pauseAllowed = 0;
    this.pauseNb = 4;
    this.sound = this.user.getPropertyNb('sound');
    this.currentLanguage = this.user.getProperty('language');
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
    this.socket.on('accountPassword', (nb:number) => {
      this.passwordError = nb;
      this.socket.emit('accountPasswordPossible');
    });
    this.socket.on('accountPasswordPossible', (nb:number) => {
      this.accountPasswordPossible = nb;
      if(nb == 0) {
        this.oldPassword = 'notused';
      }
    });
    this.socket.on('languageModify', (language:string) => {
        this.translate.use(language);
    });
    this.socket.on('reset', () => {
      this.router.navigate([''])
    });
    this.socket.on('soundModify', (sound:number) => {
      this.sound = sound;
    });
    
    this.socket.emit('accountInfo');
    this.socket.emit('accountRenameCost');
    this.socket.emit('pauseAllowed');
    this.socket.emit('accountPasswordPossible');
  }
  
  ngOnDestroy() {
    this.socket.removeListener('accountImg');
    this.socket.removeListener('accountInfo');
    this.socket.removeListener('accountRenameCost');
    this.socket.removeListener('accountRename');
    this.socket.removeListener('pauseAllowed');
    this.socket.removeListener('accountPassword');
    this.socket.removeListener('accountPasswordPossible');
    this.socket.removeListener('languageModify');
    this.socket.removeListener('reset');
    this.socket.removeListener('soundModify');
  }
  
  getAccountRenameCost() {
    return this.accountRenameCost;
  }
  getPasswordError() {
    return this.passwordError;
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
  
  accountPassword() {
    if(!this.newPassword) {
      this.passwordError = 2;
    }
    else if(!this.confirm || this.newPassword != this.confirm) {
      this.passwordError = 1;
    }
    else if(this.newPassword.length < 8) {
      this.passwordError = 2;
    }
    else {
      let msg = {
        'oldpassword': this.oldPassword,
        'newpassword': this.newPassword
      };
      this.socket.emit('accountPassword', msg);
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
  
  languageChange(event:any) {
    let language = event.target.value;
    this.socket.emit('languageModify', language);
  }
  
  uploadImage(event:any){
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      let name = event.target.files[0].name;
      
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event2:any) => {
        let playerImage = {
          'name': name,
          'data': event2.target.result
        };
        this.socket.emit('accountImgUpload', playerImage)
        this.image = '';
      }
    }
  }
}
