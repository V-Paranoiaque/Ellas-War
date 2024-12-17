import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

import bomb from '@iconify/icons-fa6-solid/bomb';
import eye from '@iconify/icons-fa6-solid/eye';
import comments from '@iconify/icons-fa6-solid/comments';
import users from '@iconify/icons-fa6-solid/users';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['../admin/admin.component.css'],
  imports: [
    AdminLeftMenuSubComponent,
    CommonModule,
    EwIconSubComponent,
    FormsModule,
    IcIconComponent,
    MainPrivateBottomMenuSubComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class AdminProfileComponent implements OnInit, OnDestroy {
  public profile = {
    membre_id: 0,
    username: '',
    membre_status: 0,
    chat_allowed: 1,
    alliance: 0,
  };
  public menu = 2;

  public adminProfile = {
    blocked_reason: '',
  };
  public profileConnections: {
    nb: number;
    list: {
      time: number;
      ip: string;
      action: number;
    }[];
  };
  public profileIP: {
    attack_history: string[];
    connection: string[];
    email_modification: string[];
    lostpassword: string[];
    password_modification: string[];
    storeroom: string[];
    storeroom_historic: string[];
    support_msg: string[];
    trade_historic_sell: string[];
    trade_historic_buy: string[];
    treasure_history: string[];
    userrename: string[];
  };
  public profileTrade: {
    nb: number;
    list: {
      trade_id: number;
      seller_id: number;
      deposit_time: number;
      return_time: number;
      nbress: number;
      rate: number;
      ress_type: number;
      deposit_ip: string;
      deposit_host: string;
      seller_ano: number;
      buyer_id: number;
      buyer_ano: number;
      purchase_date: number;
      purchase_ip: string;
      purchase_host: string;
      m1_username: string;
      m2_username: string;
    }[];
  };
  public profileStoreroom: {
    nb: number;
    list: {
      seller_id: number;
      buyer_id: number;
      m1_username: string;
      m2_username: string;
      deposit_ip: string;
      purchase_ip: string;
      return_time: number;
      purchase_date: number;
      resource_id: number;
      quantity: number;
      rate: number;
    }[];
  };
  public profileAttacks: {
    nb: number;
    list: {
      attacking: number;
      attacking_name: string;
      ip_attacking: string;
      defender: number;
      defender_name: string;
      ip_defender: string;
      time: number;
    }[];
  };
  public profileNotes = '';

  private subPlayer: Subscription;
  private subTitle: Subscription;

  Tools = Tools;
  parseInt = parseInt;

  bomb = bomb;
  comments = comments;
  eye = eye;
  users = users;

  constructor(
    private http: HttpClient,
    public user: User,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private titleService: Title,
    private socket: Socket
  ) {
    this.subPlayer = new Subscription();
    this.subTitle = new Subscription();

    this.profileConnections = {
      list: [],
      nb: 0,
    };
    this.profileIP = {
      attack_history: [],
      connection: [],
      email_modification: [],
      lostpassword: [],
      password_modification: [],
      storeroom: [],
      storeroom_historic: [],
      support_msg: [],
      trade_historic_sell: [],
      trade_historic_buy: [],
      treasure_history: [],
      userrename: [],
    };
    this.profileTrade = {
      nb: 0,
      list: [],
    };
    this.profileStoreroom = {
      nb: 0,
      list: [],
    };
    this.profileAttacks = {
      nb: 0,
      list: [],
    };
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    const userId = this.route.snapshot.paramMap.get('id') ?? '0';

    this.profile = {
      membre_id: parseInt(userId),
      username: '',
      membre_status: 0,
      chat_allowed: 1,
      alliance: 0,
    };

    this.socket.emit('adminProfile', this.profile.membre_id);
    this.socket.emit('adminProfileConnections', {
      id: this.profile.membre_id,
      page: 1,
    });
    this.socket.emit('adminProfileIP', this.profile.membre_id);
    this.socket.emit('adminProfileTrade', {
      id: this.profile.membre_id,
      page: 1,
    });
    this.socket.emit('adminProfileStoreroom', {
      id: this.profile.membre_id,
      page: 1,
    });
    this.socket.emit('adminProfileAttacks', {
      id: this.profile.membre_id,
      page: 1,
    });
    this.socket.emit('adminProfileNotes', { id: this.profile.membre_id });

    this.getProfile();

    this.socket.on('adminProfile', (data: { player: object }) => {
      this.adminProfile = data.player as typeof this.adminProfile;
    });

    this.socket.on('adminUserBlock', () => {
      this.getProfile();
    });
    this.socket.on('adminUserUnblock', () => {
      this.getProfile();
    });
    this.socket.on('adminChatBlock', () => {
      this.getProfile();
    });
    this.socket.on('adminChatUnblock', () => {
      this.getProfile();
    });

    this.socket.on('adminProfileConnections', data => {
      this.profileConnections = data;
    });
    this.socket.on('adminProfileIP', data => {
      this.profileIP = data;
    });
    this.socket.on('adminProfileTrade', data => {
      this.profileTrade = data;
    });
    this.socket.on('adminProfileStoreroom', data => {
      this.profileStoreroom = data;
    });
    this.socket.on('adminProfileAttacks', data => {
      this.profileAttacks = data;
    });
    this.socket.on('adminProfileNotes', data => {
      this.profileNotes = data;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminProfile');
    this.socket.removeListener('adminUserBlock');
    this.socket.removeListener('adminUserUnblock');
    this.socket.removeListener('adminChatBlock');
    this.socket.removeListener('adminChatUnblock');

    this.socket.removeListener('adminProfileConnections');
    this.socket.removeListener('adminProfileIP');
    this.socket.removeListener('adminProfileTrade');
    this.socket.removeListener('adminProfileStoreroom');
    this.socket.removeListener('adminProfileAttacks');
    this.socket.removeListener('adminProfileNotes');

    this.subPlayer.unsubscribe();
    this.subTitle.unsubscribe();
  }

  getProfile() {
    const url =
      this.socket.url +
      '/api/playerProfile/' +
      this.profile.membre_id.toString() +
      '.json';
    this.subPlayer = this.http.get(url).subscribe((res: object) => {
      const player = res as typeof this.profile;
      if (player.membre_id) {
        this.profile = player;

        this.subTitle = this.translate
          .get('Player profile:')
          .subscribe((res: string) => {
            this.titleService.setTitle(res + ' ' + player.username);
          });
      }
    });
  }

  adminUserBlock() {
    if (this.profile.membre_status === 1) {
      this.socket.emit('adminUserBlock', this.profile.membre_id);
    } else if (this.profile.membre_status === 3) {
      this.socket.emit('adminUserUnblock', this.profile.membre_id);
    }
  }

  adminChatBlock() {
    if (this.profile.chat_allowed === 1) {
      this.socket.emit('adminChatBlock', this.profile.membre_id);
    } else {
      this.socket.emit('adminChatUnblock', this.profile.membre_id);
    }
  }

  adminAllianceChief() {
    this.socket.emit('adminAllianceChief', this.profile.membre_id);
  }

  setMenu(i: number) {
    this.menu = i;
  }

  profileNotesSave() {
    this.socket.emit('adminProfileNotesSave', {
      id: this.profile.membre_id,
      text: this.profileNotes,
    });
  }

  reasonSave() {
    this.socket.emit('adminReasonSave', {
      id: this.profile.membre_id,
      text: this.adminProfile.blocked_reason,
    });
  }

  profileConnectionsChange(page: number) {
    this.socket.emit('adminProfileConnections', {
      id: this.profile.membre_id,
      page: page,
    });
  }
  profileTradeChange(page: number) {
    this.socket.emit('adminProfileTrade', {
      id: this.profile.membre_id,
      page: page,
    });
  }
  profileStoreroomChange(page: number) {
    this.socket.emit('adminProfileStoreroom', {
      id: this.profile.membre_id,
      page: page,
    });
  }
  profileAttacksChange(page: number) {
    this.socket.emit('adminProfileAttacks', {
      id: this.profile.membre_id,
      page: page,
    });
  }
}
