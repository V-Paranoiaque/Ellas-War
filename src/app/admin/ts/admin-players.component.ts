import { Component, OnInit, OnDestroy } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/admin-players.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminPlayersComponent implements OnInit, OnDestroy {
  
  public adminPage:any;
  public adminPlayersList:any;
  public banish:boolean;
  public blocked:boolean;
  public normal:boolean;
  public pause:boolean;
  public research:string;
  public searchType:string;
  
  constructor(private socket: Socket, public user: User,
              public translate: TranslateService) {
    this.adminPage = 1;
    this.adminPlayersList = {
      'list': [],
      'max': 1
    }
    this.banish = false;
    this.blocked = false;
    this.normal = false;
    this.pause = false;
    this.research = '';
    this.searchType = 'username';
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.socket.on('adminPlayersResearch', (list:any) => {
      this.adminPlayersList = list;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('adminPlayersResearch');
  }
  
  adminPlayersResearch() {
    let msg = {
      'searchType': this.searchType,
      'research':   this.research,
      'normal':     this.normal,
      'pause':      this.pause,
      'blocked':    this.blocked,
      'banish':     this.banish,
      'page': this.adminPage
    };
    this.socket.emit('adminPlayersResearch', msg);
  }
  
  setPage(page:any) {
    this.adminPage = page;
    this.adminPlayersResearch();
  }
}
