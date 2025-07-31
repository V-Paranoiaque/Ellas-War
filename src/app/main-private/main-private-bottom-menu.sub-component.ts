import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { UserComponent as User } from 'src/services/user.service';
import { environment } from './../../environments/environment';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import comments from '@iconify/icons-fa6-solid/comments';
import discordIcon from '@iconify-icons/logos/discord-icon';
import questionCircle from '@iconify/icons-fa6-regular/circle-question';
import times from '@iconify/icons-fa6-solid/xmark';
import triangleExclamation from '@iconify/icons-fa6-solid/triangle-exclamation';
import users from '@iconify/icons-fa6-solid/users';

import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainPrivatePlayerInfoPopupSubComponent } from './main-private-player-info-popup.sub-component';

@Component({
  selector: 'app-main-private-bottom-menu',
  templateUrl: './main-private-bottom-menu.sub-component.html',
  styleUrls: ['./main-private.component.css'],
  imports: [
    CommonModule,
    EwIconSubComponent,
    FormsModule,
    IcIconComponent,
    MainPrivatePlayerInfoPopupSubComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class MainPrivateBottomMenuSubComponent implements OnInit, OnDestroy {
  protected http = inject(HttpClient);
  user = inject(User);
  protected socket = inject(Socket);
  translate = inject(TranslateService);
  router = inject(Router);

  public chatActive: string;

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
  public selectedMsg: {
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
  } = {
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
  };
  private subPlayer: Subscription;

  @ViewChild('chatGeneral') private chatGeneralScroll?: ElementRef;
  @ViewChild('chatAlliance') private chatAllianceScroll?: ElementRef;

  environment = environment;

  comments = comments;
  discordIcon = discordIcon;
  questionCircle = questionCircle;
  times = times;
  triangleExclamation = triangleExclamation;
  users = users;

  constructor() {
    this.chatActive = '';

    this.chat_user_players = [];
    this.chat_user_msgs = [];
    this.chatUserMsg = '';
    this.chat_user_nb = 0;

    this.chat_alli_players = [];
    this.chat_alli_msgs = [];
    this.chatAlliMsg = '';
    this.chat_alli_nb = 0;

    this.subPlayer = new Subscription();
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

    this.subPlayer.unsubscribe();
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

    this.subPlayer = this.http.get(url).subscribe((resPlayer: object) => {
      this.selectedMsg.profile = resPlayer as typeof this.selectedMsg.profile;
      this.selectedMsg.id = data.id;
      this.selectedMsg.user_id = data.user_id;
      this.selectedMsg.rank = data.rank;
      this.selectedMsg.time = data.time;
      this.selectedMsg.username = data.username;
      this.selectedMsg.msg = data.msg;
    });
  }

  report() {
    this.reported = 1;
    this.socket.emit('problemReport', {
      type: 3 + this.chat,
      id: this.selectedMsg.id,
    });
  }
}
