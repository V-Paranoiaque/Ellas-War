import {
  Component,
  DestroyRef,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { UserComponent as User } from '../../services/user.service';
import { environment } from './../../environments/environment';
import { CommonModule } from '@angular/common';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import comments from '@iconify/icons-fa6-solid/comments';
import discordIcon from '@iconify-icons/logos/discord-icon';
import questionCircle from '@iconify/icons-fa6-regular/circle-question';
import times from '@iconify/icons-fa6-solid/xmark';
import triangleExclamation from '@iconify/icons-fa6-solid/triangle-exclamation';
import users from '@iconify/icons-fa6-solid/users';

import { LocaleService } from '../../services/locale.service';
import { EwIconSubComponent } from '../../services/ew-icon.service';
import { IcIconComponent } from '../../services/ic-icon.service';
import { MainPrivatePlayerInfoPopupSubComponent } from './main-private-player-info-popup.sub-component';

@Component({
  selector: 'app-main-private-bottom-menu',
  templateUrl: './main-private-bottom-menu.sub-component.html',
  styleUrls: ['./main-private.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CommonModule,
    EwIconSubComponent,
    FormsModule,
    IcIconComponent,
    MainPrivatePlayerInfoPopupSubComponent,
    RouterModule,
    TranslateDirective,
    TranslatePipe,
  ],
})
export class MainPrivateBottomMenuSubComponent implements OnInit, OnDestroy {
  protected http = inject(HttpClient);
  user = inject(User);
  protected socket = inject(Socket);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;
  router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  public chatActive = '';

  public chat_user_players: {
    user_id: number;
    rank: number;
    chat_allowed: number;
    username: string;
  }[];
  public chat_user_msgs: {
    id: number;
    user_id: number;
    rank: number;
    time: number;
    username: string;
    msg: string;
  }[];
  public chatUserMsg: string;
  public chat_user_nb: number;

  public chat_alli_players: {
    user_id: number;
    rank: number;
    chat_allowed: number;
    username: string;
  }[];
  public chat_alli_msgs: {
    id: number;
    user_id: number;
    rank: number;
    time: number;
    username: string;
    msg: string;
  }[];
  public chatAlliMsg: string;
  public chat_alli_nb: number;
  public reported = 0;
  public chat = 0;
  public selectedMsg = signal<{
    id: number;
    user_id: number;
    rank: number;
    time: number;
    username: string;
    msg: string;
    profile: {
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
    };
  }>({
    id: 0,
    user_id: 0,
    rank: 0,
    time: 0,
    username: '',
    msg: '',
    profile: {
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
    },
  });

  @ViewChild('chatGeneral') private readonly chatGeneralScroll?: ElementRef;
  @ViewChild('chatAlliance') private readonly chatAllianceScroll?: ElementRef;

  environment = environment;

  comments = comments;
  discordIcon = discordIcon;
  questionCircle = questionCircle;
  times = times;
  triangleExclamation = triangleExclamation;
  users = users;

  constructor() {
    this.chat_user_players = [];
    this.chat_user_msgs = [];
    this.chatUserMsg = '';
    this.chat_user_nb = 0;

    this.chat_alli_players = [];
    this.chat_alli_msgs = [];
    this.chatAlliMsg = '';
    this.chat_alli_nb = 0;
  }

  ngOnInit() {
    this.socket.emit('chatUserPlayers');
    this.socket.emit('chatUserMsgs');
    this.socket.emit('chatAlliPlayers');
    this.socket.emit('chatAlliMsgs');

    /*** General Chat ***/
    this.socket.on('chatUserPlayers', players => {
      this.chat_user_players = players as typeof this.chat_user_players;
    });
    this.socket.on('chatUserPlayersRefresh', () => {
      this.socket.emit('chatUserPlayers');
    });
    this.socket.on('chatUserMsgs', msgs => {
      this.chat_user_msgs = msgs as typeof this.chat_user_msgs;
    });

    this.socket.on(
      'chatUserMsg',
      (
        msg: {
          id: number;
          user_id: number;
          rank: number;
          time: number;
          username: string;
          msg: string;
        }[]
      ) => {
        this.chat_user_msgs.push(msg[0]);
        if (!this.chatActive.startsWith('general')) {
          if (msg[0].user_id != this.user.getPropertyNb('id')) {
            this.chat_user_nb++;
          }
        } else {
          this.scrollGeneral();
        }
      }
    );

    /*** Alliance chat ***/
    this.socket.on('chatAlliPlayers', players => {
      this.chat_alli_players = players as typeof this.chat_alli_players;
    });
    this.socket.on('chatAlliPlayersRefresh', () => {
      this.socket.emit('chatAlliPlayers');
    });
    this.socket.on('chatAlliMsgs', msgs => {
      this.chat_alli_msgs = msgs as typeof this.chat_alli_msgs;
    });
    this.socket.on(
      'chatAlliMsg',
      (
        msg: {
          id: number;
          user_id: number;
          rank: number;
          time: number;
          username: string;
          msg: string;
        }[]
      ) => {
        this.chat_alli_msgs.push(msg[0]);
        if (!this.chatActive.startsWith('alliance')) {
          if (msg[0].user_id != this.user.getPropertyNb('id')) {
            this.chat_alli_nb++;
          }
        } else {
          this.scrollAlliance();
        }
      }
    );
  }

  ngOnDestroy() {
    this.socket.removeListener('chatUserPlayers');
    this.socket.removeListener('chatUserPlayersRefresh');
    this.socket.removeListener('chatUserMsgs');
    this.socket.removeListener('chatUserMsg');

    this.socket.removeListener('chatAlliPlayers');
    this.socket.removeListener('chatAlliPlayersRefresh');
    this.socket.removeListener('chatAlliMsgs');
    this.socket.removeListener('chatAlliMsg');
  }

  chatUserSend() {
    const msg = this.chatUserMsg.trim();
    if (msg.length > 0) {
      this.socket.emit('chatUserMsg', msg);
      this.chatUserMsg = '';
    }
  }
  chatAlliSend() {
    const msg = this.chatAlliMsg.trim();
    if (msg.length > 0) {
      this.socket.emit('chatAlliMsg', msg);
      this.chatAlliMsg = '';
    }
  }

  scrollAlliance() {
    setTimeout(() => {
      this.chatAllianceScroll?.nativeElement.scroll({
        top: 999999,
        left: 0,
        behavior: 'auto',
      });
    }, 0);
  }

  scrollGeneral() {
    setTimeout(() => {
      this.chatGeneralScroll?.nativeElement.scroll({
        top: 999999,
        left: 0,
        behavior: 'auto',
      });
    }, 0);
  }

  set(chat: string) {
    this.chatActive = chat;
  }

  toggle(chat: string) {
    if (this.chatActive == chat) {
      this.chatActive = '';
    } else {
      this.chatActive = chat;
    }
    if (this.chatActive.startsWith('general')) {
      this.chat_user_nb = 0;
      this.scrollGeneral();
    } else if (this.chatActive.startsWith('alliance')) {
      this.chat_alli_nb = 0;
      this.scrollAlliance();
    }
  }

  disconnect() {
    this.user.disconnect();
  }

  reportPrepare(
    data: {
      id: number;
      user_id: number;
      rank: number;
      time: number;
      username: string;
      msg: string;
    },
    chat: number
  ) {
    this.reported = 0;
    this.chat = chat;

    const url =
      this.socket.url +
      '/api/playerProfile/' +
      data.user_id.toString() +
      '.json';
    this.socket.emit('accountInfo');

    this.http
      .get(url)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((resPlayer: object) => {
        this.selectedMsg.set({
          id: data.id,
          user_id: data.user_id,
          rank: data.rank,
          time: data.time,
          username: data.username,
          msg: data.msg,
          profile: resPlayer as {
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
          },
        });
      });
  }

  report() {
    this.reported = 1;
    this.socket.emit('problemReport', {
      type: 3 + this.chat,
      id: this.selectedMsg().id,
    });
  }
}
