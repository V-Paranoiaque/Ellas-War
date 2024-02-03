import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-admin-agora',
  templateUrl: './admin-agora.component.html',
  styleUrls: ['../admin/admin.component.css'],
})
export class AdminAgoraComponent implements OnInit, OnDestroy {
  public list: {
    seller_id: number;
    m1_username: string;
    buyer_id: number;
    m2_username: string;
    deposit_ip: string;
    purchase_ip: string;
    return_time: number;
    purchase_date: number;
    ress_type: number;
    nbress: number;
    rate: number;
  }[];
  public msgPageNb: number;
  public currentPage: number;

  public begining: string;
  public beginDate: number;
  public minRate: string;
  public maxRate: string;
  public player1: string;
  public player2: string;
  public resource: string;
  public sort: string;
  public still: boolean;
  public solded: boolean;

  Tools = Tools;

  constructor(
    public user: User,
    private socket: Socket,
    public translate: TranslateService
  ) {
    this.list = [];
    this.msgPageNb = 1;
    this.currentPage = 1;

    this.begining = '';
    this.beginDate = 0;
    this.minRate = '';
    this.maxRate = '';
    this.player1 = '';
    this.player2 = '';
    this.resource = '';
    this.sort = '';
    this.still = false;
    this.solded = false;
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.begining = this.researchDate();
    this.adminTradeList(0);

    this.socket.on(
      'adminTradeList',
      (msg: { list: object[]; nbPage: number }) => {
        this.list = msg.list as typeof this.list;
        this.msgPageNb = msg.nbPage;
      }
    );
  }

  ngOnDestroy() {
    this.socket.removeListener('adminTradeList');
  }

  researchDate() {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return (
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    );
  }

  adminAgoraChange(page: string | number) {
    this.currentPage = parseInt(page as string);
    this.socket.emit('adminTradeList', {
      minRate: this.minRate,
      maxRate: this.maxRate,
      begining: this.begining,
      still: this.still,
      solded: this.solded,
      resource: this.resource,
      player1: this.player1,
      player2: this.player2,
      sort: this.sort,
      page: this.currentPage,
    });
  }

  adminTradeList(reset: number) {
    if (reset == 1) {
      this.currentPage = 1;
      this.msgPageNb = 1;
    }
    let beginDate;
    if (this.begining != '') {
      const beginDateTmp = this.begining.split('/');
      beginDate = parseInt(
        (
          new Date(
            beginDateTmp[1] + '/' + beginDateTmp[0] + '/' + beginDateTmp[2]
          ).getTime() / 1000
        ).toFixed(0)
      );
    } else {
      beginDate = this.begining;
    }

    this.socket.emit('adminTradeList', {
      minRate: this.minRate,
      maxRate: this.maxRate,
      begining: beginDate,
      still: this.still,
      solded: this.solded,
      resource: this.resource,
      player1: this.player1,
      player2: this.player2,
      sort: this.sort,
      page: this.currentPage,
    });
  }
}
