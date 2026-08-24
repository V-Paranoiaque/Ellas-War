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
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LocaleService } from '../../services/locale.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';
import { UserProfileSubComponent } from '../main/main-user-profile.sub-component';

@Component({
  selector: 'app-connectedplayers',
  templateUrl: './connectedplayers.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CommonModule,
    MainLeftSubComponent,
    MainRightSubComponent,
    RouterModule,
    TranslateDirective,
    UserProfileSubComponent,
  ],
})
export class ConnectedplayersComponent implements OnInit, OnDestroy {
  user = inject(User);
  private readonly http = inject(HttpClient);
  private readonly socket = inject(Socket);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;
  private readonly titleService = inject(Title);

  public connected = signal<
    {
      membre_id: number;
      username: string;
      level: number;
      field: number;
      alliance: number;
      alliance_name: string;
    }[]
  >([]);
  private subTitle: Subscription;
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.subTitle = new Subscription();
  }

  ngOnInit() {
    this.getPage();

    this.socket.on('chatUserPlayersRefresh', () => {
      this.getPage();
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('chatUserPlayersRefresh');
    this.subTitle.unsubscribe();
  }

  getPage() {
    const url = this.socket.url + '/api/connected.json';

    this.http
      .get(url)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.connected.set(
          result as {
            membre_id: number;
            username: string;
            level: number;
            field: number;
            alliance: number;
            alliance_name: string;
          }[]
        );
      });
    this.subTitle = this.translate
      .get('Connected players on the Ancient Greece')
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
  }
}
