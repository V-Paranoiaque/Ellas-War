import { RouterModule } from '@angular/router';
import {
  Component,
  DestroyRef,
  OnInit,
  OnDestroy,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LocaleService } from '../../services/locale.service';
import { AdminLeftMenuSubComponent } from './admin-left-menu.sub-component';
import { IcIconComponent } from '../../services/ic-icon.service';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

import eye from '@iconify/icons-fa6-solid/eye';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    AdminLeftMenuSubComponent,
    CommonModule,
    IcIconComponent,
    MainPrivateBottomMenuSubComponent,
    RouterModule,
    TranslateDirective,
  ],
})
export class AdminComponent implements OnInit, OnDestroy {
  protected http = inject(HttpClient);
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;
  private readonly destroyRef = inject(DestroyRef);

  public adminStats = {
    honor_last_time: 0,
    diamond_last_time: 0,
    daily_last_time: 0,
    weekly_last_time: 0,
  };
  public apiInfo = signal({
    uptime: 0,
    timestamp: 0,
    min: 0,
  });

  eye = eye;

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.emit('adminStats');

    const url = this.socket.url + '/api.json';
    this.http
      .get(url)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.apiInfo.set(
          result as {
            uptime: number;
            timestamp: number;
            min: number;
          }
        );
      });

    this.socket.on('adminStats', (msg: object) => {
      this.adminStats = msg as typeof this.adminStats;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminStats');
  }
}
