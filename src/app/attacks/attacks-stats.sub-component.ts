import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

import { IcIconComponent } from 'src/services/ic-icon.service';

import questionCircle from '@iconify/icons-fa6-regular/circle-question';
import shieldShaded from '@iconify/icons-bi/shield-shaded';
import swordCross from '@iconify/icons-mdi/sword-cross';

@Component({
  selector: 'app-attacks-stats',
  templateUrl: './attacks-stats.sub-component.html',
  styleUrls: ['./attacks.component.css'],
  imports: [CommonModule, IcIconComponent, TranslateModule],
})
export class AttacksStatsSubComponent implements OnInit, OnDestroy {
  protected socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  public attackStats = {
    normal: {
      done: 0,
      available: 0,
      unavailable: 0,
      time: 0,
    },
    war: {
      done: 0,
      available: 0,
      unavailable: 0,
      time: 0,
    },
    bonus: {
      done: 0,
      available: 0,
      unavailable: 0,
      time: 0,
    },
    receive_normal: {
      done: 0,
      available: 0,
      unavailable: 0,
      time: 0,
    },
    receive_war: {
      done: 0,
      available: 0,
      unavailable: 0,
      time: 0,
    },
  };
  public countdown = {
    normal: { hour: 0, min: 0, sec: 0, tt: 0 },
    war: { hour: 0, min: 0, sec: 0, tt: 0 },
    bonus: { hour: 0, min: 0, sec: 0, tt: 0 },
    receive_normal: { hour: 0, min: 0, sec: 0, tt: 0 },
    receive_war: { hour: 0, min: 0, sec: 0, tt: 0 },
  };

  Tools = Tools;

  questionCircle = questionCircle;
  shieldShaded = shieldShaded;
  swordCross = swordCross;

  ngOnInit() {
    this.socket.emit('attackStats');

    this.socket.on('attackStats', (data: object) => {
      this.attackStats = data as typeof this.attackStats;
      const time = Math.round(new Date().getTime() / 1000);

      if (this.attackStats.normal.time > time) {
        this.countdown.normal.tt = this.attackStats.normal.time - time;
      } else {
        this.countdown.normal.tt = 0;
      }
      if (this.attackStats.war.time > time) {
        this.countdown.war.tt = this.attackStats.war.time - time;
      }
      if (this.attackStats.bonus.time > time) {
        this.countdown.bonus.tt = this.attackStats.bonus.time - time;
      }
      if (this.attackStats.receive_normal.time > time) {
        this.countdown.receive_normal.tt =
          this.attackStats.receive_normal.time - time;
      }
      if (this.attackStats.receive_war.time > time) {
        this.countdown.receive_war.tt =
          this.attackStats.receive_war.time - time;
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
}
