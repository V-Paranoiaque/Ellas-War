import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  selector: 'app-options-account-information-popup',
  templateUrl: '../html/options-account-information-popup.sub-component.html'
})

export class OptionsAccountInformationPopupSubComponent implements OnInit, OnDestroy {
  
  public description:string;
  public errorAccountSave: number;
  public image:any;
  public imageProfile:any;
  public location:string;
  
  constructor(private router: Router, private socket: Socket, public user: User, public translate: TranslateService) {
    this.description = '';
    this.errorAccountSave = 0;
    this.imageProfile = '';
    this.location = '';
  }
  
  ngOnInit() {
    this.socket.emit('accountInfo');
    
    this.socket.on('accountImg', (name:any) => {
      this.imageProfile = name;
    });
    this.socket.on('accountInfo', (info:any) => {
      this.imageProfile = info.membre_img;
      this.location     = info.location;
      this.description  = info.description;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('accountImg');
    this.socket.removeListener('accountInfo');
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
