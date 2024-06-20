import { ActivatedRoute } from '@angular/router';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';

import { UserComponent as User } from '../../services/user.service';

import { MessagesComponent } from './messages.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages-popup',
  templateUrl: './messages-popup.sub-component.html',
})
export class MessagesPopupSubComponent
  extends MessagesComponent
  implements OnInit, OnDestroy
{
  private subLoad: Subscription;

  constructor(
    override http: HttpClient,
    override user: User,
    override socket: Socket,
    override translate: TranslateService,
    override scroller: ViewportScroller,
    protected route: ActivatedRoute
  ) {
    super(http, user, socket, translate, scroller);
    this.subLoad = new Subscription();
  }

  override ngOnInit() {
    this.user.checkPermissions([0, 1, 2, 3, 4, 5]);

    this.subLoad = this.route.paramMap.subscribe(params => {
      const id = parseInt(params.get('id') ?? '0');
      this.reinitDest();
      if (id) {
        this.addDestGUi(id);
      }
    });
  }

  override ngOnDestroy() {
    this.subLoad.unsubscribe();
  }
}
