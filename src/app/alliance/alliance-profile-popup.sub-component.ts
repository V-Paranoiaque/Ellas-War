import { Component, Input } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { environment } from './../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alliance-profile-popup',
  templateUrl: './alliance-profile-popup.sub-component.html',
  imports: [FormsModule, TranslateModule],
})
export class AllianceProfilePopupSubComponent {
  @Input() allianceProfile!: {
    alliance_name: string;
    chief_id: number;
    description: string;
  };

  public description: string;
  public errorProfileSave: number;
  public image: string;
  public imageProfile: string;

  environment = environment;

  constructor(
    private readonly socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.description = '';
    this.errorProfileSave = 0;
    this.imageProfile = '';
    this.image = '';
  }

  uploadImage(event: Event) {
    const files = (event.target as HTMLInputElement).files;

    if (files?.[0]) {
      const reader = new FileReader();
      const name = files[0].name;

      reader.readAsDataURL(files[0]);
      reader.onload = (event2: ProgressEvent<FileReader>) => {
        if (event2.target) {
          const playerImage = {
            name: name,
            data: event2.target.result,
          };
          this.socket.emit('allianceImgUpload', playerImage);
        }
        this.image = '';
      };
    }
  }

  profileSave() {
    this.errorProfileSave = 1;
    const msg = {
      description: this.allianceProfile.description,
    };

    this.socket.emit('myAllianceProfileSave', msg);

    setTimeout(() => {
      this.errorProfileSave = 0;
    }, 3000);
  }
}
