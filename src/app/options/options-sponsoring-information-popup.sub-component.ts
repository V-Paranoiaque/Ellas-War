import {
  Component,
  DestroyRef,
  OnInit,
  OnDestroy,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LocaleService } from '../../services/locale.service';
import { EwIconSubComponent } from '../../services/ew-icon.service';
import { IcIconComponent } from '../../services/ic-icon.service';
import { UserProfileSubComponent } from '../main/main-user-profile.sub-component';

import clipboardCheck from '@iconify/icons-fa6-solid/clipboard-check';
import link from '@iconify/icons-fa6-solid/link';

@Component({
  selector: 'app-options-sponsoring-information-popup',
  templateUrl: './options-sponsoring-information-popup.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    ClipboardModule,
    CommonModule,
    EwIconSubComponent,
    FormsModule,
    IcIconComponent,
    RouterModule,
    TranslateDirective,
    UserProfileSubComponent,
    TranslatePipe,
  ],
})
export class OptionsSponsoringInformationPopupSubComponent
  implements OnInit, OnDestroy
{
  private readonly http = inject(HttpClient);
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;
  private readonly destroyRef = inject(DestroyRef);

  public sponsorList: object[] = [];
  public linkSaved: number = 0;
  public sponsorError = 0;
  public sponsorNew = '';
  public sponsorUsername = signal('');

  //Icons
  clipboardCheck = clipboardCheck;
  link = link;

  ngOnInit() {
    this.socket.emit('sponsorList');

    this.socket.on('sponsorChoose', (data: number) => {
      this.sponsorError = data;
    });
    this.socket.on('sponsorList', (data: object[]) => {
      this.sponsorList = data;
    });
    this.socket.on('sponsorPlayer', (data: number) => {
      this.getSponsor(data);
    });
    this.getSponsor(this.user.getPropertyNb('sponsor'));
  }

  ngOnDestroy() {
    this.socket.removeListener('sponsorChoose');
    this.socket.removeListener('sponsorList');
    this.socket.removeListener('sponsorPlayer');
  }

  sponsorChoose() {
    this.socket.emit('sponsorChoose', this.sponsorNew);
  }

  getSponsor(id: number) {
    const url =
      this.socket.url + '/api/playerProfile/' + id.toString() + '.json';
    this.http
      .get(url)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: object) => {
        const player = res as { membre_id: number; username: string };
        if (player.membre_id) {
          this.sponsorUsername.set(player.username);
        }
      });
  }

  copyLink() {
    this.linkSaved = 1;

    setTimeout(() => {
      this.linkSaved = 0;
    }, 2000);
  }
}
