import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

import { LocaleService } from '../../services/locale.service';
import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

@Component({
  selector: 'app-admin-page404',
  templateUrl: './admin-page404.component.html',
  styleUrls: ['../admin/admin.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    AdminLeftMenuSubComponent,
    CommonModule,
    MainPrivateBottomMenuSubComponent,
    TranslateDirective,
  ],
})
export class AdminPage404Component implements OnInit, OnDestroy {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;

  public pageList: { url: string; nb: number }[];

  constructor() {
    this.pageList = [];
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.emit('adminList404');

    this.socket.on('adminList404', (list: object[]) => {
      this.pageList = list as { url: string; nb: number }[];
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminList404');
  }
}
