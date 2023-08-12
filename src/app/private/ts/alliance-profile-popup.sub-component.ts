import { Component, Input } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-alliance-profile-popup',
  templateUrl: '../html/alliance-profile-popup.sub-component.html'
})

export class AllianceProfilePopupSubComponent {
  
  @Input() allianceProfile:any;
  
  public description:string;
  public errorProfileSave:number;
  public image:string;
  public imageProfile:string;

  environment = environment;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.description = '';
    this.errorProfileSave = 0;
    this.imageProfile = '';
    this.image = '';
  }
  
  uploadImage(event: Event){
    const files = (event?.target as HTMLInputElement)?.files
    
    if(files && files[0]) {
      let reader = new FileReader();
      let name = files[0].name;
      
      reader.readAsDataURL(files[0]);
      reader.onload = (event2:any) => {
        let playerImage = {
          'name': name,
          'data': event2.target.result
        };
        this.socket.emit('allianceImgUpload', playerImage)
        this.image = '';
      }
    }
  }
  
  profileSave() {
    this.errorProfileSave = 1;
    let msg = {
      description: this.allianceProfile.description
    };
    
    this.socket.emit('myAllianceProfileSave', msg);
    
    setTimeout(() => {
      this.errorProfileSave = 0;
    }, 3000);
  }
}
