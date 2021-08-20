import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'app-alliance-profile-popup',
  templateUrl: '../html/alliance-profile-popup.sub-component.html'
})

export class AllianceProfilePopupSubComponent {
  
  @Input() allianceProfile:any;
  
  public description:string;
  public errorProfileSave:number;
  public image:any;
  public imageProfile:any;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.description = '';
    this.errorProfileSave = 0;
    this.imageProfile = '';
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
