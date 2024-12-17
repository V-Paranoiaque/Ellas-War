import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-options-account-information-popup',
  templateUrl: './options-account-information-popup.sub-component.html',
  imports: [ClipboardModule, CommonModule, FormsModule, TranslateModule],
})
export class OptionsAccountInformationPopupSubComponent
  implements OnInit, OnDestroy
{
  public description: string;
  public errorAccountSave: number;
  public imageProfile: string;
  public location: string;

  constructor(
    private router: Router,
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.description = '';
    this.errorAccountSave = 0;
    this.imageProfile = '';
    this.location = '';
  }

  ngOnInit() {
    this.socket.emit('accountInfo');

    this.socket.on('accountImg', (name: string) => {
      this.imageProfile = name;
    });
    this.socket.on(
      'accountInfo',
      (info: { membre_img: string; location: string; description: string }) => {
        this.imageProfile = info.membre_img;
        this.location = info.location;
        this.description = info.description;
      }
    );
  }

  ngOnDestroy() {
    this.socket.removeListener('accountImg');
    this.socket.removeListener('accountInfo');
  }

  accountSave() {
    this.errorAccountSave = 1;
    const msg = {
      location: this.location,
      description: this.description,
    };

    this.socket.emit('accountModify', msg);

    setTimeout(() => {
      this.errorAccountSave = 0;
    }, 3000);
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
          this.socket.emit('accountImgUpload', playerImage);
        }
      };
    }
  }
}
