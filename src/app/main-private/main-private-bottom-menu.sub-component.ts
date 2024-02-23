import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { UserComponent as User } from 'src/services/user.service';
import { environment } from './../../environments/environment';

import comments from '@iconify/icons-fa6-solid/comments';
import discordIcon from '@iconify-icons/logos/discord-icon';
import times from '@iconify/icons-fa6-solid/xmark';
import triangleExclamation from '@iconify/icons-fa6-solid/triangle-exclamation';
import users from '@iconify/icons-fa6-solid/users';

@Component({
  selector: 'app-main-private-bottom-menu',
  templateUrl: './main-private-bottom-menu.sub-component.html',
  styleUrls: ['./main-private.component.css'],
})
export class MainPrivateBottomMenuSubComponent implements OnInit, OnDestroy {
  public chatActive: string;

  public chat_user_players: {
    user_id: number;
    rank: number;
    chat_allowed: number;
    username: string;
  }[];
  public chat_user_msgs: {
    chat_id: number;
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
    chat_id: number;
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
    chat_id: number;
    user_id: number;
    rank: number;
    time: number;
    username: string;
    msg: string;
  } = {
    chat_id: 0,
    user_id: 0,
    rank: 0,
    time: 0,
    username: '',
    msg: '',
  };

  @ViewChild('chatGeneral') private chatGeneralScroll?: ElementRef;
  @ViewChild('chatAlliance') private chatAllianceScroll?: ElementRef;

  environment = environment;

  comments = comments;
  discordIcon = discordIcon;
  times = times;
  triangleExclamation = triangleExclamation;
  users = users;

  constructor(
    protected socket: Socket,
    public router: Router,
    public user: User
  ) {
    this.chatActive = '';

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
          chat_id: number;
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
          chat_id: number;
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
      chat_id: number;
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
    this.selectedMsg = data;
  }

  report() {
    this.reported = 1;
    this.socket.emit('problemReport', {
      type: 3 + this.chat,
      id: this.selectedMsg.chat_id,
    });
  }
}
