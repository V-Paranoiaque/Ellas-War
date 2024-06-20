import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UserComponent as User } from '../../services/user.service';
import { environment } from './../../environments/environment';

import discordIcon from '@iconify-icons/logos/discord-icon';
import fileAlt from '@iconify/icons-fa6-solid/file-lines';
import flag from '@iconify/icons-fa6-solid/flag';
import questionCircle from '@iconify/icons-fa6-regular/circle-question';
import swordIcon from '@iconify/icons-vaadin/sword';
import userPlus from '@iconify/icons-fa6-solid/user-plus';
import users from '@iconify/icons-fa6-solid/users';

@Component({
  templateUrl: './diplomacy.component.html',
})
export class DiplomacyComponent implements OnInit, OnDestroy {
  public allianceList: {
    alliance_id: number;
    alliance_name: string;
    nbmembers: number;
    alliance_type: number;
    username: string;
    chief_id: number;
    victories: number;
    defeats: number;
    recruitement_open: number;
    pact: number;
    war: number;
  }[];
  public allianceProfile = {
    pact_id: 0,
    alliance_id: 0,
    alliance_name: '',
    pact: 0,
    started: 0,
    war: 0,
  };
  public allianceWait = {
    alliance_id: 0,
    alliance_name: '',
  };
  public order: string;
  private sub: Subscription;

  environment = environment;

  discordIcon = discordIcon;
  fileAlt = fileAlt;
  flag = flag;
  questionCircle = questionCircle;
  swordIcon = swordIcon;
  userPlus = userPlus;
  users = users;

  constructor(
    private router: Router,
    private http: HttpClient,
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.allianceList = [];
    this.order = '';
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.emit('allianceList', this.order);
    this.socket.emit('allianceWait');

    this.socket.on('allianceList', data => {
      this.allianceList = data;
    });
    this.socket.on('allianceListReload', () => {
      this.socket.emit('allianceList', this.order);
    });
    this.socket.on('allianceNew', (data: number) => {
      if (data === 1) {
        void this.router.navigate(['/alliance']);
      }
    });
    this.socket.on('alliancePactAsk', () => {
      this.socket.emit('alliancePactList');
    });
    this.socket.on('allianceRankingRefresh', () => {
      this.socket.emit('allianceList', this.order);
    });
    this.socket.on('allianceWait', (data: object) => {
      this.allianceWait = data as typeof this.allianceWait;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('allianceList');
    this.socket.removeListener('allianceListReload');
    this.socket.removeListener('allianceNew');
    this.socket.removeListener('alliancePactAsk');
    this.socket.removeListener('allianceRankingRefresh');
    this.socket.removeListener('allianceWait');
    this.sub.unsubscribe();
  }

  allianceListOrder(order: string) {
    this.order = order;
    this.socket.emit('allianceList', this.order);
  }

  allianceWaitCancel() {
    this.socket.emit('allianceWaitCancel');
  }

  getProfile(id: number) {
    const url =
      this.socket.url + '/api/allianceProfile/' + id.toString() + '.json';

    this.sub = this.http.get(url).subscribe(res => {
      this.allianceProfile = res as typeof this.allianceProfile;
    });
  }

  setAlliance(alliance: object) {
    this.allianceProfile = alliance as typeof this.allianceProfile;
    if (this.allianceProfile.pact_id) {
      this.socket.emit('alliancePactInfo', this.allianceProfile.pact_id);
    }
    this.allianceProfile.started = 0;
  }
}
