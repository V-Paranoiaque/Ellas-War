import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { CommonModule } from '@angular/common';

import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';
import { MessagesPopupSubComponent } from '../messages/messages-popup.sub-component';
import { OptionsIncludeComponent } from '../options/options-include.component';

import brushIcon from '@iconify/icons-bi/brush';
import triangleExclamation from '@iconify/icons-fa6-solid/triangle-exclamation';
import userCircle from '@iconify/icons-fa6-solid/circle-user';
import userShield from '@iconify/icons-fa6-solid/user-shield';

interface Profile {
  membre_id: number;
  username: '';
  level: number;
  xp: number;
  victory: number;
  field: number;
  featsofstrength: number;
  alliance: number;
  alliance_name: string;
  rank_name: string;
  location: string;
  inscription: number;
  description: string;
  membre_img: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    CommonModule,
    IcIconComponent,
    MainLeftSubComponent,
    MainRightSubComponent,
    MessagesPopupSubComponent,
    OptionsIncludeComponent,
    TranslateModule,
    RouterModule,
  ],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public onChange: EventEmitter<object> = new EventEmitter<object>();

  public id = 0;
  public profile: Profile;
  public reported = 0;

  private subPlayer: Subscription;
  private subTitle: Subscription;
  private subDesc: Subscription;

  brushIcon = brushIcon;
  triangleExclamation = triangleExclamation;
  userCircle = userCircle;
  userShield = userShield;

  constructor(
    protected http: HttpClient,
    public user: User,
    protected socket: Socket,
    public translate: TranslateService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.profile = {
      membre_id: 0,
      username: '',
      level: 0,
      xp: 0,
      victory: 0,
      field: 0,
      featsofstrength: 0,
      alliance: 0,
      alliance_name: '',
      rank_name: '',
      location: '',
      inscription: 0,
      description: '',
      membre_img:
        '../assets/styles/' +
        Tools.getStyle(this.user.getProperty('style') as string) +
        '/default-profile.png',
    };
    this.subPlayer = new Subscription();
    this.subTitle = new Subscription();
    this.subDesc = new Subscription();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = parseInt(params.get('id') ?? '0');
      this.load(id);
    });
    this.socket.on('accountRefresh', () => {
      const userId = this.route.snapshot.paramMap.get('id') ?? '';
      this.load(parseInt(userId));
    });
  }

  ngOnDestroy() {
    this.subPlayer.unsubscribe();
    this.subTitle.unsubscribe();
    this.subDesc.unsubscribe();

    this.socket.removeListener('accountRefresh');
  }

  load(userId: number) {
    const url =
      this.socket.url + '/api/playerProfile/' + userId.toString() + '.json';
    this.socket.emit('accountInfo');

    this.subPlayer = this.http.get(url).subscribe((resPlayer: object) => {
      const player = resPlayer as Profile;
      if (player.membre_id) {
        this.profile = player;

        this.subTitle = this.translate
          .get('Player profile:')
          .subscribe((res: string) => {
            this.titleService.setTitle(res + ' ' + player.username);
          });
        this.subDesc = this.translate
          .get('Visualize the statistics of')
          .subscribe((res: string) => {
            this.metaService.removeTag('name=description');
            this.metaService.addTag({
              name: 'description',
              content: res + ' ' + player.username,
            });
          });
        this.socket.onChange.emit({
          action: 'addDest',
          username: player.username,
        });
      }
    });
  }

  report() {
    this.reported = 1;
    this.socket.emit('problemReport', { type: 1, id: this.profile.membre_id });
  }
}
