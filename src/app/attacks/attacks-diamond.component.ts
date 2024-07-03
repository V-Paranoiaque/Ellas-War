import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { MessageContent } from 'src/services/message.class';

import bleedingEye from '@iconify/icons-game-icons/bleeding-eye';
import gooeyEyedSun from '@iconify/icons-game-icons/gooey-eyed-sun';
import questionCircle from '@iconify/icons-fa6-regular/circle-question';
import swordIcon from '@iconify/icons-vaadin/sword';

@Component({
  templateUrl: './attacks-diamond.component.html',
  styleUrls: ['./attacks.component.css'],
})
export class AttacksDiamondComponent implements OnInit, OnDestroy {
  public attackInfo = new MessageContent();
  public attackMode: number;
  public attackPossible = 0;
  public attackPossibleError = 0;
  public diamondInfo: {
    membre_id: number;
    username: string;
    alliance: number;
    alliance_name: string;
    field: number;
    victory: number;
    last_id: number;
    last_username: string;
    possible_field: number;
    attack_allowed: number;
  };
  public diamondRankingPlayers: {
    ranking: number;
    membre_id: number;
    username: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }[];
  public diamondRankingAlliance: {
    ranking: number;
    alliance_name: string;
    alliance: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }[];
  public targetProfile: {
    membre_id: number;
    username: string;
    alliance: number;
    alliance_name: string;
    rank_name: string;
    level: number;
    field: number;
    victory: number;
    xp: number;
    diamond_begin: number;
  };
  public waveAttackSum: object;
  public realWaveAttackSum: object;

  Tools = Tools;

  //Icons
  bleedingEyes = bleedingEye;
  gooeyEyedSun = gooeyEyedSun;
  questionCircle = questionCircle;
  swordIcon = swordIcon;

  constructor(
    protected socket: Socket,
    public user: User,
    public translate: TranslateService,
    private scroller: ViewportScroller
  ) {
    this.attackMode = 0;
    this.diamondInfo = {
      membre_id: 0,
      username: '',
      alliance: 0,
      alliance_name: '',
      field: 0,
      victory: 0,
      last_id: 0,
      last_username: '',
      possible_field: 0,
      attack_allowed: 0,
    };
    this.diamondRankingPlayers = [];
    this.diamondRankingAlliance = [];
    this.targetProfile = {
      membre_id: 0,
      username: '',
      alliance: 0,
      alliance_name: '',
      rank_name: '',
      level: 0,
      field: 0,
      victory: 0,
      xp: 0,
      diamond_begin: 0,
    };
    this.realWaveAttackSum = {};
    this.waveAttackSum = {};
  }

  ngOnInit() {
    this.user.checkPermissions([1]);
    this.socket.emit('diamondInfo');
    this.socket.emit('diamondRankingPlayers');
    this.socket.emit('diamondRankingAlliance');
    this.socket.emit('msgPage', {
      page: 1,
      category: 1,
    });

    this.socket.on('attack', datas => {
      this.attackMode = 4;
      this.attackInfo = new MessageContent({ content: datas });
    });
    this.socket.on(
      'attackPossible',
      (data: { result: number; error: number }) => {
        this.attackPossible = data.result;
        this.attackPossibleError = data.error;

        setTimeout(() => {
          this.scroller.scrollToAnchor('attackPrepareBlock');
        }, 100);
      }
    );
    this.socket.on('diamondInfo', info => {
      this.diamondInfo = info;
    });
    this.socket.on('diamondRankingPlayers', info => {
      this.diamondRankingPlayers = info;
    });
    this.socket.on('diamondRankingAlliance', info => {
      this.diamondRankingAlliance = info;
    });
    this.socket.on('profile', data => {
      this.targetProfile = data;
      setTimeout(() => {
        if (this.attackMode === 5) {
          this.scroller.scrollToAnchor('furyPrepareBlock');
        } else if (this.attackMode === 7) {
          this.scroller.scrollToAnchor('lightningPrepareBlock');
        }
      }, 100);
    });
    this.socket.on('realWaveAttackSum', data => {
      this.realWaveAttackSum = data;
      const newTab = [];
      let j = 0;
      for (const i in this.realWaveAttackSum) {
        if (
          this.realWaveAttackSum[i as keyof typeof this.realWaveAttackSum] > 0
        ) {
          newTab.push(j);
          j++;
        }
      }
    });
    this.socket.on('waveAttackSum', data => {
      this.waveAttackSum = data;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('attack');
    this.socket.removeListener('attackPossible');
    this.socket.removeListener('diamondInfo');
    this.socket.removeListener('diamondRankingPlayers');
    this.socket.removeListener('diamondRankingAlliance');
    this.socket.removeListener('profile');
    this.socket.removeListener('realWaveAttackSum');
    this.socket.removeListener('waveAttackSum');
  }

  prepareAttack(id: number) {
    this.attackMode = 3;

    this.socket.emit('profile', id);
    this.socket.emit('attackPossible', id);
    this.socket.emit('waveAttackSum');
    this.socket.emit('realWaveAttackSum');
  }
  getArmy() {
    const list = [];
    for (const i in this.waveAttackSum) {
      let all = 1;
      if (this.waveAttackSum[i as keyof typeof this.waveAttackSum] > 0) {
        if (
          this.realWaveAttackSum[i as keyof typeof this.realWaveAttackSum] <
          this.waveAttackSum[i as keyof typeof this.waveAttackSum]
        ) {
          all = 0;
        }
        list.push({
          unit: i,
          nb: this.realWaveAttackSum[i as keyof typeof this.realWaveAttackSum]
            ? this.realWaveAttackSum[i as keyof typeof this.realWaveAttackSum]
            : 0,
          all: all,
        });
      }
    }

    return list;
  }
  getOffensivePower() {
    let result = 0;

    if (this.user.getProperty('datas')) {
      for (const i in this.realWaveAttackSum) {
        if (
          this.realWaveAttackSum[i as keyof typeof this.realWaveAttackSum] > 0
        ) {
          const army = this.user.getDatas().army as object;
          const unit = army[i as keyof typeof army] as { attack: number };
          result +=
            unit.attack *
            this.realWaveAttackSum[i as keyof typeof this.realWaveAttackSum];
        }
      }
    }

    return result;
  }

  launchAttack(id: number) {
    this.attackPossible = -1;
    this.socket.emit('attack', id);
  }
  observe(id: number) {
    this.attackMode = 1;

    this.socket.emit('profile', id);
    this.socket.emit('furyPossible', id);
    this.socket.emit('lightningPossible', id);
    this.socket.emit('attackPossible', id);
    this.socket.emit('eye', id);
  }
  spy(id: number) {
    this.attackMode = 2;

    this.socket.emit('profile', id);
    this.socket.emit('furyPossible', id);
    this.socket.emit('lightningPossible', id);
    this.socket.emit('attackPossible', id);
    this.socket.emit('spyInfo', id);
  }
}
