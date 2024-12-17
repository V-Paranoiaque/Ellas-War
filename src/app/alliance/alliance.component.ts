import { RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

import { AllianceAbstractComponent } from './alliance-abstract.component';
import { AllianceIncludeComponent } from './alliance-include.component';
import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';
import { UserProfileSubComponent } from '../main/main-user-profile.sub-component';

import brushIcon from '@iconify/icons-bi/brush';
import cog from '@iconify/icons-fa6-solid/gear';
import coinBagSolid from '@iconify-icons/clarity/coin-bag-solid';
import eye from '@iconify/icons-fa6-solid/eye';
import filePaper2Line from '@iconify-icons/ri/file-paper-2-line';
import flag from '@iconify/icons-fa6-solid/flag';
import handHolding from '@iconify/icons-fa6-solid/hand-holding';
import swordIcon from '@iconify/icons-vaadin/sword';
import times from '@iconify/icons-fa6-solid/xmark';
import solidHandsPraying from '@iconify/icons-fa6-solid/hands-praying';
import sportsMedal from '@iconify-icons/emojione-monotone/sports-medal';

@Component({
  templateUrl: './alliance.component.html',
  styleUrls: ['./alliance.component.css'],
  imports: [
    AllianceIncludeComponent,
    CommonModule,
    EwIconSubComponent,
    MainLeftSubComponent,
    MainRightSubComponent,
    IcIconComponent,
    RouterModule,
    TranslateModule,
    UserProfileSubComponent,
  ],
})
export class AllianceComponent
  extends AllianceAbstractComponent
  implements OnInit, OnDestroy
{
  public allianceProfile = {
    pact_id: 0,
    alliance_id: 0,
    alliance_name: '',
    pact: 0,
    started: 0,
  };
  public allowDissolve: number;
  public allowLeave: number;
  public myAllianceMembers: {
    membre_id: number;
    username: string;
    level: number;
    membre_status: number;
    rank_name: string;
    victory: number;
    field: number;
    xp: number;
    last_activity: number;
    gift: number;
    remain: number;
    allow_eject: number;
    freereturn: number;
  }[] = [];
  public myAllianceProfile: {
    alliance_name: string;
    chief_id: number;
    description: string;
  };
  public myAllianceWar: {
    alliance_attacking: number;
    name_attacking: string;
    win_attacking: number;
    alliance_defender: number;
    name_defender: string;
    win_defender: number;
    begin: number;
    time: number;
  }[];
  public myAllianceWaitList: { username: string; level: number }[];
  public myAllianceWaitNb = 0;
  public pactList: {
    alliance_id: number;
    alliance_name: string;
    pact: number;
  }[];
  public ressList: string[];
  public selectedPlayer = {
    membre_id: 0,
    username: '',
    level: 0,
    motivations: '',
    help: 0,
    allow_eject: 0,
    rank_name: '',
    second: 0,
    recruiter: 0,
    strategist: 0,
    treasurer: 0,
    freereturn: 0,
  };
  public selectedRequest: {
    resource: string;
    quantity: string;
    stock: number;
  };
  public selectedWar = {
    alliance_attacking: 0,
    name_attacking: '',
    win_attacking: 0,
    alliance_defender: 0,
    name_defender: '',
    win_defender: 0,
    begin: 0,
    time: 0,
  };
  public taxes = {
    drachma: 0,
    food: 0,
    water: 0,
    wood: 0,
    stone: 0,
    iron: 0,
    marble: 0,
    grapes: 0,
    wine: 0,
    gold: 0,
  };
  public legend = {
    paused: 0,
    blocked: 0,
  };

  brushIcon = brushIcon;
  cog = cog;
  coinBagSolid = coinBagSolid;
  eye = eye;
  filePaper2Line = filePaper2Line;
  flag = flag;
  handHolding = handHolding;
  swordIcon = swordIcon;
  times = times;
  solidHandsPraying = solidHandsPraying;
  sportsMedal = sportsMedal;

  constructor(
    protected override socket: Socket,
    public override user: User,
    public override translate: TranslateService
  ) {
    super(socket, user, translate);

    this.allowDissolve = 0;
    this.allowLeave = 0;
    this.myAllianceProfile = {
      alliance_name: '',
      chief_id: 0,
      description: '',
    };
    this.myAllianceWaitList = [];
    this.myAllianceWar = [];
    this.pactList = [];
    this.ressList = environment.resources;
    this.selectedRequest = {
      resource: 'drachma',
      quantity: '',
      stock: 0,
    };
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.emit('alliancePactListAll');

    this.socket.emit('myAllianceProfile');
    this.socket.emit('myAllianceMembers');
    this.socket.emit('myAllianceAllowLeave');
    this.socket.emit('myAllianceAllowDissolve');
    this.socket.emit('myAllianceWaitList');
    this.socket.emit('myAllianceWar');

    this.socket.on('allianceMembersRefresh', () => {
      this.socket.emit('myAllianceMembers');
      this.socket.emit('myAllianceAllowLeave');
    });
    this.socket.on('alliancePactAsk', () => {
      this.socket.emit('alliancePactListAll');
    });
    this.socket.on('alliancePactListAll', data => {
      this.pactList = data;
    });
    this.socket.on('myAllianceProfile', data => {
      this.myAllianceProfile = data as typeof this.myAllianceProfile;
    });
    this.socket.on('myAllianceProfileRefresh', () => {
      this.socket.emit('myAllianceProfile');
    });
    this.socket.on('myAllianceMembers', data => {
      this.myAllianceMembers = data;
      this.legend = {
        paused: 0,
        blocked: 0,
      };
      for (const p of this.myAllianceMembers) {
        if (p.membre_status === 3 || p.membre_status === 5) {
          this.legend.blocked = 1;
        } else if (p.membre_status === 4) {
          this.legend.paused = 1;
        }
      }
    });
    this.socket.on('myAllianceAllowLeave', data => {
      this.allowLeave = data;
    });
    this.socket.on('myAllianceWar', data => {
      this.myAllianceWar = data;
    });
    this.socket.on('myAllianceAllowDissolve', data => {
      this.allowDissolve = data;
    });
    this.socket.on('myAllianceMembersRefresh', () => {
      this.socket.emit('myAllianceMembers');
      this.socket.emit('myAllianceAllowLeave');
    });
    this.socket.on('myAllianceAllowLeaveRefresh', () => {
      this.socket.emit('myAllianceAllowLeave');
      this.socket.emit('myAllianceAllowDissolve');
    });
    this.socket.on('myAllianceAllowDissolveRefresh', () => {
      this.socket.emit('myAllianceAllowLeave');
      this.socket.emit('myAllianceAllowDissolve');
    });
    this.socket.on('myAllianceWaitList', data => {
      this.myAllianceWaitList = data;
    });
    this.socket.on('myAllianceWaitListRefresh', () => {
      this.socket.emit('myAllianceWaitList');
    });
    this.socket.on('myAllianceWaitNb', data => {
      this.myAllianceWaitNb = data;
    });
    this.socket.on('myAllianceWaitNbRefresh', () => {
      this.socket.emit('myAllianceWaitNb');
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('allianceMembersRefresh');
    this.socket.removeListener('alliancePactAsk');
    this.socket.removeListener('alliancePactListAll');

    this.socket.removeListener('myAllianceProfile');
    this.socket.removeListener('myAllianceProfileRefresh');
    this.socket.removeListener('myAllianceMembers');
    this.socket.removeListener('myAllianceAllowLeave');
    this.socket.removeListener('myAllianceWar');
    this.socket.removeListener('myAllianceAllowDissolve');
    this.socket.removeListener('myAllianceMembersRefresh');
    this.socket.removeListener('myAllianceAllowLeaveRefresh');
    this.socket.removeListener('myAllianceAllowDissolveRefresh');
    this.socket.removeListener('myAllianceWaitList');
    this.socket.removeListener('myAllianceWaitListRefresh');
    this.socket.removeListener('myAllianceWaitNb');
    this.socket.removeListener('myAllianceWaitNbRefresh');
  }

  getProfile() {
    this.socket.emit('myAllianceProfile');
  }

  getStock(res: string) {
    const index = 'stock_' + res;
    return this.myAllianceProfile[index as keyof typeof this.myAllianceProfile];
  }
  getTax(res: string) {
    const index = 'tax_' + res;
    return this.myAllianceProfile[index as keyof typeof this.myAllianceProfile];
  }

  setAlliance(info: object) {
    this.allianceProfile = info as typeof this.allianceProfile;
  }

  setPlayer(user: object, type: number) {
    this.selectedPlayer = { ...user } as typeof this.selectedPlayer;
    this.selectedPlayer.help = 0;

    if (type === 1) {
      this.socket.emit(
        'myAllianceGiftRemain',
        (user as { membre_id: number }).membre_id
      );
    }
  }

  setRequest(res: string) {
    this.selectedRequest = {
      resource: res,
      quantity: '',
      stock: parseFloat(this.getStock(res) as string),
    };
    this.socket.emit('myAllianceAskList');
    this.socket.emit('myAllianceAskMy');
  }

  taxesInit() {
    for (const i in environment.resources) {
      Object.defineProperty(this.taxes, environment.resources[i], {
        value: parseInt(this.getTax(environment.resources[i]) as string),
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }
  }

  warSelect(war: object) {
    this.selectedWar = war as typeof this.selectedWar;
    this.socket.emit('myAllianceWarHistory', {
      attacking: this.selectedWar.alliance_attacking,
      defender: this.selectedWar.alliance_defender,
    });
  }
}
