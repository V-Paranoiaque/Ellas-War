import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { UserComponent as User } from '../../services/user.service';
import { environment } from './../../environments/environment';

import discordIcon from '@iconify-icons/logos/discord-icon';
import eye from '@iconify/icons-fa6-solid/eye';

@Component({
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
})
export class SupportComponent implements OnInit, OnDestroy {
  public msg = 0;
  public answerMsg: string;
  public contactList: {
    support_id: number;
    support_topic: string;
    last_username: string;
    support_lastdate: number;
  }[];
  public contactC: number;
  public contactInfo: {
    title: string;
    msg: { support_msg: string; username: string; support_date: number }[];
  };
  public contactNb: number;
  public contactNewTitle: string;
  public contactNewMsg: string;

  parseInt = parseInt;
  Tools = Tools;
  environment = environment;

  discordIcon = discordIcon;
  eye = eye;

  constructor(
    private router: Router,
    public user: User,
    private route: ActivatedRoute,
    private socket: Socket
  ) {
    this.answerMsg = '';
    this.contactList = [];
    this.contactC = 0;
    this.contactNb = 0;
    this.contactInfo = {
      title: '',
      msg: [],
    };

    //New msg
    this.contactNewTitle = '';
    this.contactNewMsg = '';
  }

  ngOnInit() {
    this.user.checkPermissions([1, 2, 3, 4, 5]);

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.contactC = parseInt(id);
      } else {
        this.contactC = 1;
      }

      const msg = params.get('msg');
      if (msg) {
        this.msg = parseInt(msg);
      } else {
        this.msg = 0;
      }

      this.socket.emit('contactList', this.contactC);
      this.loadSupport();
    });

    this.socket.on(
      'contactList',
      (data: { list: object[]; cPage: number; max: number }) => {
        this.contactList = data.list as typeof this.contactList;
        this.contactNb = data.max;
        this.contactC = data.cPage;
      }
    );

    this.socket.on('contactListRefresh', () => {
      this.socket.emit('contactList');
      this.loadSupport();
    });

    this.socket.on('contactNew', (data: number) => {
      void this.router.navigate(['/support/1/' + data]);
    });

    this.socket.on('contactInfo', data => {
      this.contactInfo = data;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('contactList');
    this.socket.removeListener('contactListRefresh');
    this.socket.removeListener('contactNew');
    this.socket.removeListener('contactInfo');
  }

  contactAnswer() {
    if (this.answerMsg.trim().length > 0) {
      const info = {
        id: this.msg,
        text: this.answerMsg.trim(),
      };
      this.socket.emit('contactAnswer', info);
      this.answerMsg = '';
    }
  }

  contactNewSend() {
    const title = this.contactNewTitle.trim();
    const text = this.contactNewMsg.trim();

    if (title.length > 0 && text.length > 0) {
      const info = {
        title: title,
        text: text,
      };
      this.socket.emit('contactNew', info);

      const element: HTMLElement = document.getElementById(
        'SupportNewTopicClose'
      )!;
      element.click();

      this.contactNewTitle = '';
      this.contactNewMsg = '';
    }
  }

  loadSupport() {
    if (this.msg > 0) {
      this.socket.emit('contactInfo', this.msg);
    }
  }

  supportPageChange(page: number) {
    if (!page || page < 1) {
      page = 1;
    }

    if (page > this.contactNb) {
      page = this.contactNb;
    }

    void this.router.navigate(['/support/' + page]);
  }
}
