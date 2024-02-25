import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

import crown from '@iconify/icons-fa6-solid/crown';
import cog from '@iconify/icons-fa6-solid/gear';
import email from '@iconify/icons-mdi/email';
import history from '@iconify/icons-fa6-solid/clock-rotate-left';
import idBadge from '@iconify/icons-fa6-solid/id-badge';
import key from '@iconify/icons-fa6-solid/key';
import userCircle from '@iconify/icons-fa6-solid/circle-user';
import redo from '@iconify/icons-fa6-solid/rotate-right';

@Component({
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
})
export class OptionsComponent implements OnInit, OnDestroy {
  public accountPasswordPossible: number;
  private accountRenameCost: number;

  private renameError: number;
  public emailError: number;
  public passwordError: number;

  public confirm: string;
  public currentLanguage: string;
  public currentStyle: string;
  public newEmail: string;
  public newPassword: string;
  public newusername: string;
  public oldPassword: string;
  public pauseAllowed: number;
  public pauseNb: number;
  public sound: number;

  cog = cog;
  crown = crown;
  email = email;
  history = history;
  idBadge = idBadge;
  key = key;
  userCircle = userCircle;
  redo = redo;

  constructor(
    private socket: Socket,
    public user: User,
    private router: Router,
    public translate: TranslateService
  ) {
    this.user.checkPermissions([1, 2, 3, 4, 5]);

    this.accountPasswordPossible = 0;
    if (user.getPropertyNb('level') >= 1) {
      this.accountRenameCost = 1;
    } else {
      this.accountRenameCost = 0;
    }

    this.renameError = 0;
    this.emailError = 0;
    this.passwordError = 0;

    this.confirm = '';
    this.newEmail = '';
    this.newPassword = '';
    this.newusername = '';
    this.oldPassword = '';
    this.pauseAllowed = 0;
    this.pauseNb = 4;
    this.sound = this.user.getPropertyNb('sound');
    this.currentLanguage = this.user.getProperty('language') as string;
    this.currentStyle = this.user.getProperty('style') as string;
  }

  ngOnInit() {
    this.socket.on('accountRenameCost', (result: number) => {
      this.accountRenameCost = result;
    });

    this.socket.on('accountRename', (result: number) => {
      this.socket.emit('accountRenameCost');
      this.renameError = result;
    });
    this.socket.on('pauseAllowed', (result: number) => {
      this.pauseAllowed = result;
    });
    this.socket.on('accountPassword', (nb: number) => {
      this.passwordError = nb;
      this.socket.emit('accountPasswordPossible');
    });
    this.socket.on('accountPasswordPossible', (nb: number) => {
      this.accountPasswordPossible = nb;
      if (nb === 0) {
        this.oldPassword = 'notused';
      }
    });
    this.socket.on('languageModify', (language: string) => {
      this.translate.use(language);
    });
    this.socket.on('reset', () => {
      void this.router.navigate(['']);
    });
    this.socket.on('soundModify', (sound: number) => {
      this.sound = sound;
    });

    this.socket.emit('accountRenameCost');
    this.socket.emit('pauseAllowed');
    this.socket.emit('accountPasswordPossible');
  }

  ngOnDestroy() {
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
    if (this.newEmail) {
      this.socket.emit('accountEmail', this.newEmail);
    } else {
      this.emailError = 1;
    }
  }

  accountPause() {
    if (this.pauseNb >= 4 && this.pauseNb <= 100) {
      this.socket.emit('pause', this.pauseNb);
    }
  }

  accountPassword() {
    if (!this.newPassword) {
      this.passwordError = 2;
    } else if (!this.confirm || this.newPassword != this.confirm) {
      this.passwordError = 1;
    } else if (this.newPassword.length < 8) {
      this.passwordError = 2;
    } else {
      const msg = {
        oldpassword: this.oldPassword,
        newpassword: this.newPassword,
      };
      this.socket.emit('accountPassword', msg);
    }
  }

  accountRename() {
    this.socket.emit('accountRename', this.newusername);
    this.newusername = '';
  }

  parametersLoad() {
    this.currentStyle = this.user.getProperty('style') as string;
  }

  reset() {
    this.socket.emit('reset');
  }

  soundModify() {
    this.socket.emit('soundModify', this.sound);
  }

  styleChange(event: Event) {
    const style = (event.target as HTMLInputElement).value;
    this.socket.emit('styleModify', style);
  }

  languageChange(event: Event) {
    const language = (event.target as HTMLInputElement).value;
    this.socket.emit('languageModify', language);
  }
}
