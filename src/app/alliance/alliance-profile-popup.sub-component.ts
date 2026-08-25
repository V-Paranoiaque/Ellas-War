import {
  Component,
  Input,
  inject,
  ChangeDetectionStrategy,
  signal
} from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { environment } from './../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alliance-profile-popup',
  templateUrl: './alliance-profile-popup.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule, TranslateDirective, TranslatePipe],
})
export class AllianceProfilePopupSubComponent {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  @Input() allianceProfile!: {
    alliance_name: string;
    chief_id: number;
    description: string;
  };

  public description: string;
  public errorProfileSave = signal(0);
  public image: string;
  public imageProfile: string;

  environment = environment;

  constructor() {
    this.description = '';
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
    this.errorProfileSave.set(1);
    const msg = {
      description: this.allianceProfile.description,
    };

    this.socket.emit('myAllianceProfileSave', msg);

    setTimeout(() => {
      this.errorProfileSave.set(0);
    }, 3000);
  }
}
