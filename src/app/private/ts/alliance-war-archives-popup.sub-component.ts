import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

import shieldShaded from '@iconify/icons-bi/shield-shaded';
import swordIcon from '@iconify/icons-vaadin/sword';

@Component({
  selector: 'app-alliance-war-archives-popup',
  templateUrl: '../html/alliance-war-archives-popup.sub-component.html'
})

export class AllianceWarArchivesPopupSubComponent implements OnInit, OnDestroy {
  
  @Input() info:any;
  
  public warInfo:{
    end:number,
    time: number,
    list: {
      result:number, defender:number, offender:number, attacking:number,
      ausername:string, dusername:string, time:number,
    }[]
  };
  
  shieldShaded = shieldShaded;
  swordIcon = swordIcon;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.warInfo = {
      end: 0,
      time: 0,
      list: []
    };
  }
  
  ngOnInit() {
    this.socket.on('myAllianceWarHistory', (data) => {
      this.warInfo = data;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('myAllianceWarHistory');
  }
  
  warVictory() {
    let min;
    let official = this.user.getDatas().war.victory;
    if(this.info.win_attacking > this.info.win_defender) {
      min = this.info.win_defender;
    }
    else {
      min = this.info.win_attacking;
    }
    min += this.user.getDatas().war.diff;
    
    if(min > official) {
      return min;
    }
    else {
      return official;
    }
  }
}
