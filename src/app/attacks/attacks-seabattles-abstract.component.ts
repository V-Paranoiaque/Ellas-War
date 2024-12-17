import { Component } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';

@Component({
  template: '',
})
export class AttacksSeabattlesAbstractComponent {
  public sbData = {
    sb_id: 0,
    sb_status: 0,
    sb_nb: 0,
    start_date: 0,
    coins: 0,
    mouvements: 0,
    sb_map: {},
  };

  constructor(
    protected http: HttpClient,
    protected socket: Socket,
    public user: User,
    public translate: TranslateService,
    protected modalService: BsModalService
  ) {}
}
