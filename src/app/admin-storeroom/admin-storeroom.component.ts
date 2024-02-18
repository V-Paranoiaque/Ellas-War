import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-admin-storeroom',
  templateUrl: './admin-storeroom.component.html',
  styleUrls: ['../admin/admin.component.css'],
})
export class AdminStoreroomComponent implements OnInit, OnDestroy {
  public list: {
    seller_id: number;
    buyer_id: number;
    m1_username: string;
    m2_username: string;
    deposit_ip: string;
    purchase_ip: string;
    resource_id: number;
    return_time: number;
    quantity: number;
    rate: number;
    purchase_date: number;
  }[];
  public msgPageNb: number;
  public currentPage: number;

  public beginning: string;
  public minRate: string;
  public maxRate: string;
  public player1: string;
  public player2: string;
  public resource: string;
  public sort: string;

  Tools = Tools;

  constructor(
    public user: User,
    private socket: Socket,
    public translate: TranslateService
  ) {
    this.list = [];
    this.msgPageNb = 1;
    this.currentPage = 1;

    this.beginning = '';
    this.minRate = '';
    this.maxRate = '';
    this.player1 = '';
    this.player2 = '';
    this.resource = '';
    this.sort = '';
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.beginning = this.researchDate();
    this.adminStoreroomList(0);

    this.socket.on(
      'adminStoreroomList',
      (msg: { list: object[]; nbPage: number }) => {
        this.list = msg.list as typeof this.list;
        this.msgPageNb = msg.nbPage;
      }
    );
  }

  ngOnDestroy() {
    this.socket.removeListener('adminStoreroomList');
  }

  researchDate() {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return (
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    );
  }

  adminStoreroomChange(page: string | number) {
    this.currentPage = parseInt(page as string);
    this.socket.emit('adminStoreroomList', {
      minRate: this.minRate,
      maxRate: this.maxRate,
      beginning: this.beginning,
      resource: this.resource,
      player1: this.player1,
      player2: this.player2,
      sort: this.sort,
      page: this.currentPage,
    });
  }

  adminStoreroomList(reset: number) {
    if (reset == 1) {
      this.currentPage = 1;
      this.msgPageNb = 1;
    }
    let beginDate;
    if (this.beginning != '') {
      const beginDateTmp = this.beginning.split('/');
      beginDate = parseInt(
        (
          new Date(
            beginDateTmp[1] + '/' + beginDateTmp[0] + '/' + beginDateTmp[2]
          ).getTime() / 1000
        ).toFixed(0)
      );
    } else {
      beginDate = this.beginning;
    }

    this.socket.emit('adminStoreroomList', {
      minRate: this.minRate,
      maxRate: this.maxRate,
      beginning: beginDate,
      resource: Tools.getResId(this.resource),
      player1: this.player1,
      player2: this.player2,
      sort: this.sort,
      page: this.currentPage,
    });
  }
}
