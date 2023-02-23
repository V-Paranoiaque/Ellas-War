import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { ToolsComponent as Tools } from '../../../services/tools.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/admin-storeroom.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminStoreroomComponent implements OnInit, OnDestroy {
  
  public list:any[];
  public msgPageNb:number;
  public currentPage:number;
  
  public begining:string;
  public beginDate:any;
  public minRate:string;
  public maxRate:string;
  public player1:string;
  public player2:string;
  public resource:any;
  public sort:string;
  public still:any;
  public solded:any;
  
  Tools = Tools;
  
  constructor(public user: User, private socket: Socket,
              public translate: TranslateService) {
    this.list = [];
    this.msgPageNb = 1;
    this.currentPage = 1;
    
    this.begining = '';
    this.minRate = '';
    this.maxRate = '';
    this.player1 = '';
    this.player2 = '';
    this.resource = '';
    this.sort = '';
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.begining = this.researchDate();
    this.adminStoreroomList(0);
    
    this.socket.on('adminStoreroomList', (msg) => {
      this.list      = msg.list;
      this.msgPageNb = msg.nbPage;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('adminStoreroomList');
  }
  
  researchDate() {
    let date = new Date();
    date.setDate(date.getDate()-7);
    return date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
  }
  
  adminStoreroomChange(page:any) {
    this.currentPage = page;
    this.socket.emit('adminStoreroomList', {
      'minRate': this.minRate,
      'maxRate': this.maxRate,
      'begining': this.begining,
      'still':    this.still,
      'solded':   this.solded,
      'resource': this.resource,
      'player1':  this.player1,
      'player2':  this.player2,
      'sort':     this.sort,
      'page':     this.currentPage
    });
  }
  
  adminStoreroomList(reset:number) {
    if(reset == 1) {
      this.currentPage = 1;
      this.msgPageNb = 1;
    }
    let beginDate;
    if(this.begining != '') {
      let beginDateTmp = this.begining.split('/');
      beginDate = parseInt((new Date(beginDateTmp[1]+"/"+beginDateTmp[0]+"/"+beginDateTmp[2]).getTime() / 1000).toFixed(0))
    }
    else {
      beginDate = this.begining;
    }
    
    this.socket.emit('adminStoreroomList', {
      'minRate': this.minRate,
      'maxRate': this.maxRate,
      'begining': beginDate,
      'still':    this.still,
      'solded':   this.solded,
      'resource': this.resource,
      'player1':  this.player1,
      'player2':  this.player2,
      'sort':     this.sort,
      'page':     this.currentPage
    });
  }
}
  