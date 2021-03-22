import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import shieldShaded from '@iconify/icons-bi/shield-shaded';
import swordCross from '@iconify/icons-mdi/sword-cross';

@Component({
  selector: 'attacks-stats',
  templateUrl: '../html/attacks-stats.sub-component.html',
  styleUrls: ['../css/attacks.component.css']
})

export class AttacksStats {
  
  public attackStats:any;
  public countdown:any;
  
  shieldShaded = shieldShaded;
  swordCross   = swordCross;
  
  constructor(protected socket: Socket, public user: User, public translate: TranslateService) {
    this.attackStats = {
      'normal': {
        'done': 0,
        'available': 0,
        'unavailable': 0,
        'time': 0
      },
      'war': {
        'done': 0,
        'available': 0,
        'unavailable': 0,
        'time': 0
      },
      'bonus': {
        'done': 0,
        'available': 0,
        'unavailable': 0,
        'time': 0
      },
      'receive_normal': {
        'done': 0,
        'available': 0,
        'unavailable': 0,
        'time': 0
      },
      'receive_war': {
        'done': 0,
        'available': 0,
        'unavailable': 0,
        'time': 0
      }
    };
    this.countdown = {
      'normal': {},
      'war': {},
      'bonus': {},
      'receive_normal': {},
      'receive_war': {}
    }
  }
  
  ngOnInit() {
    this.socket.emit('attackStats');
    
    this.socket.on('attackStats', (data:any) => {
      this.attackStats = data;
      let time = Math.round(new Date().getTime() / 1000);
      
      if(data.normal.time > time) {
        this.countdown.normal.tt = data.normal.time - time;
      }
      else {
        this.countdown.normal.tt = 0;
      }
      if(data.war.time > time) {
        this.countdown.war.tt = data.war.time - time;
      }
      if(data.bonus.time > time) {
        this.countdown.bonus.tt = data.bonus.time - time;
      }
      if(data.receive_normal.time > time) {
        this.countdown.receive_normal.tt = data.receive_normal.time - time;
      }
      if(data.receive_war.time > time) {
        this.countdown.receive_war.tt = data.receive_war.time - time;
      }
    });
    
    this.socket.on('attackStatsRefresh', () => {
      this.socket.emit('attackStats');
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('attackStats');
    this.socket.removeListener('attackStatsRefresh');
  }
  
  range(a:number, b:number) {
    let list = []
    for(a;a<=b;a++) {
      list.push(a);
    }
    return list;
  }
}
