import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { MessageContent } from 'src/services/message.class';

import bleedingEye from '@iconify/icons-game-icons/bleeding-eye';
import gooeyEyedSun from '@iconify/icons-game-icons/gooey-eyed-sun';
import plusIcon from '@iconify/icons-bi/plus';
import questionCircle from '@iconify/icons-fa6-regular/circle-question';
import shieldShaded from '@iconify/icons-bi/shield-shaded';
import swordIcon from '@iconify/icons-vaadin/sword';
import twotoneFence from '@iconify/icons-ic/twotone-fence';

@Component({
  templateUrl: './attacks-sanctuaries.component.html',
  styleUrls: ['./attacks.component.css'],
})
export class AttacksSanctuariesComponent implements OnInit, OnDestroy {

  public attackMode:number;
  public sanctuariesAttackInfo: MessageContent;
  public sanctuariesDefense: object[];
  public sanctuariesList: {
    sanctuaries_id: number;
    sanctuaries_name: string;
    username: string;
    sanctuaries_victory: number;
    sanctuaries_power: number;
    membre_id: number;
  }[];
  public sanctuariesSpyInfo: {
    error: number;
    id: number;
    sanctuaries_name: string;
    unitiesNb: number;
    unities: string[];
  };
  public sanctuariesInfo: {
    sanctuaries_id: number;
    sanctuaries_name: string;
    sanctuaries_power: number;
    sanctuaries_victory: number;
    sanctuaries_defense: number;
    membre_id: number;
    price: object;
  };
  public sanctuariesWave: number[];
  public sanctuariesWaveTab: number[];
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

  //Icons
  bleedingEyes = bleedingEye;
  gooeyEyedSun = gooeyEyedSun;
  plusIcon = plusIcon;
  questionCircle = questionCircle;
  shieldShaded = shieldShaded;
  swordIcon = swordIcon;
  twotoneFence = twotoneFence;

  Math = Math;
  Tools = Tools;

  constructor(
    protected socket: Socket,
    public user: User,
    public translate: TranslateService,
    private scroller: ViewportScroller
  ) {
    this.attackMode = 0;
    this.waveAttackSum = {};
    this.realWaveAttackSum = {};
    this.sanctuariesAttackInfo = new MessageContent();
    this.sanctuariesList = [];
    this.sanctuariesSpyInfo = {
      error: 0,
      id: 0,
      sanctuaries_name: '',
      unitiesNb: 0,
      unities: [],
    };
    this.sanctuariesDefense = [];
    this.sanctuariesInfo = {
      sanctuaries_id: 0,
      sanctuaries_name: '',
      sanctuaries_power: 0,
      sanctuaries_victory: 0,
      sanctuaries_defense: 0,
      membre_id: 0,
      price: {},
    };
    this.sanctuariesWave = [];
    this.sanctuariesWaveTab = [];
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
  }

  ngOnInit() {
    this.socket.emit('msgPage', {
      page: 1,
      category: 7,
    });
    this.socket.emit('realWaveAttackSum');
    this.socket.emit('sanctuariesList');
    this.socket.emit('waveAttackSum');

    this.socket.on('profile', data => {
      this.targetProfile = data;
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
      if (this.sanctuariesWaveTab.length !== newTab.length) {
        this.sanctuariesWaveTab = newTab;
      }
    });
    this.socket.on('sanctuariesList', data => {
      this.sanctuariesList = data;
    });
    this.socket.on('sanctuariesAttack', data => {
      this.attackMode = 11;
      this.sanctuariesAttackInfo = new MessageContent({ content: data });

      this.socket.emit('sanctuariesList');
    });
    this.socket.on('sanctuariesEye', data => {
      this.attackMode = 9;
      this.sanctuariesSpyInfo = data;
      setTimeout(() => {
        this.scroller.scrollToAnchor('sanctuaryEyeBlock');
      }, 100);
    });
    this.socket.on('sanctuariesDefense', data => {
      this.sanctuariesDefense = data as typeof this.sanctuariesDefense;
      this.socket.emit('waveAttackSum');
      this.socket.emit('realWaveAttackSum');
    });
    this.socket.on('sanctuariesSpy', data => {
      this.attackMode = 9;
      this.sanctuariesSpyInfo = data;
      setTimeout(() => {
        this.scroller.scrollToAnchor('sanctuaryEyeBlock');
      }, 100);
    });
    this.socket.on('sanctuariesInfo', (data: object) => {
      this.sanctuariesInfo = data as typeof this.sanctuariesInfo;
      if (this.sanctuariesInfo.membre_id === this.user.getPropertyNb('id')) {
        this.attackMode = 12;
        setTimeout(() => {
          this.scroller.scrollToAnchor('sanctuaryInfoBlock');
        }, 100);
      }
    });
    this.socket.on('sanctuariesInfoRefresh', () => {
      if (this.sanctuariesInfo.sanctuaries_id) {
        this.socket.emit(
          'sanctuariesInfo',
          this.sanctuariesInfo.sanctuaries_id
        );
      }
      this.socket.emit('sanctuariesList');
    });

    this.socket.on('waveAttackSum', data => {
      this.waveAttackSum = data;
    });
  };

  ngOnDestroy() {
    this.socket.removeListener('realWaveAttackSum');
    this.socket.removeListener('sanctuariesList');
    this.socket.removeListener('sanctuariesAttack');
    this.socket.removeListener('sanctuariesEye');
    this.socket.removeListener('sanctuariesDefense');
    this.socket.removeListener('sanctuariesSpy');
    this.socket.removeListener('sanctuariesInfo');
    this.socket.removeListener('sanctuariesInfoRefresh');
    this.socket.removeListener('waveAttackSum');
  }

  getSanctuariesDefense() {
    const list = [];

    for (const i in this.sanctuariesDefense) {
      if (this.sanctuariesDefense[i]) {
        for (const [unit, nb] of Object.entries(this.sanctuariesDefense[i])) {
          if (nb > 0) {
            list.push({
              unit: unit,
              nb: nb,
            });
          }
        }
      }
    }

    return list;
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

  sanctuariesAttack(id: number) {
    this.attackMode = 11;
    this.socket.emit('sanctuariesAttack', id);
  }
  sanctuariesPrepareUnit(id: number, nb: number) {
    this.attackMode = 10;
    this.sanctuariesWave[id] = nb;
  }
  sanctuariesEye(id: number) {
    this.targetProfileReset();
    this.socket.emit('sanctuariesEye', id);
  }
  sanctuaryManage(id: number) {
    this.targetProfileReset();
    this.socket.emit('realWaveAttackCheck');
    this.socket.emit('sanctuariesInfo', id);
    this.socket.emit('sanctuariesDefense', id);
  }

  sanctuariesPrepare(id: number) {
    this.attackMode = 10;
    this.targetProfileReset();
    this.socket.emit('waveAttackSum');
    this.socket.emit('realWaveAttackSum');
    this.socket.emit('sanctuariesInfo', id);
  }
  sanctuariesSpy(id: number) {
    this.targetProfileReset();
    this.socket.emit('sanctuariesSpy', id);
  }

  targetProfileReset() {
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
  }
  waveNew(i: number, nb: number) {
    const army = this.getArmy()[i];
    const unit = army.unit;
    if (nb > 0 && nb <= army.nb) {
      const msg = {
        unit: unit,
        wave: 1,
        nb: nb,
        sanctuary: this.sanctuariesInfo.sanctuaries_id,
      };
      this.socket.emit('sanctuariesWaveNew', msg);
      this.sanctuariesWave[i] = 0;
    }
  }
}