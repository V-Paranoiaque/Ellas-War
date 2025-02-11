import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { Message } from '../../services/message.class';

import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';
import { MessagesIncludeComponent } from '../messages/messages-include.component';

@Component({
  selector: 'app-permalink',
  templateUrl: './permalink.component.html',
  imports: [
    MainLeftSubComponent,
    MainRightSubComponent,
    MessagesIncludeComponent,
    TranslateModule,
    RouterModule,
  ],
})
export class PermalinkComponent implements OnInit, OnDestroy {
  private currentMsg: Message;

  constructor(
    private titleService: Title,
    public translate: TranslateService,
    private readonly socket: Socket,
    public user: User,
    private route: ActivatedRoute
  ) {
    this.currentMsg = new Message();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.socket.emit('msgInfo', id);

    this.socket.on('msgInfo', (msgInfo: object) => {
      this.currentMsg = msgInfo as typeof this.currentMsg;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('msgInfo');
  }

  getCurrentMsg() {
    return this.currentMsg;
  }
}
