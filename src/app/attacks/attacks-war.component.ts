import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { MessageContent } from 'src/services/message.class';

import bleedingEye from '@iconify/icons-game-icons/bleeding-eye';
import boltIcon from '@iconify/icons-fa6-solid/bolt';
import dotCircle from '@iconify/icons-fa6-solid/circle-dot';
import fireIcon from '@iconify/icons-fa6-solid/fire';
import gemIcon from '@iconify/icons-fa6-regular/gem';
import gooeyEyedSun from '@iconify/icons-game-icons/gooey-eyed-sun';
import questionCircle from '@iconify/icons-fa6-regular/circle-question';
import sortDown from '@iconify/icons-fa6-solid/sort-down';
import sortUP from '@iconify/icons-fa6-solid/sort-up';
import swordIcon from '@iconify/icons-vaadin/sword';

@Component({
  templateUrl: './attacks-war.component.html',
  styleUrls: ['./attacks.component.css'],
})
export class AttacksWarComponent implements OnInit, OnDestroy {
  public attackInfo = new MessageContent();
  public attackMode: number;
  public attackOrderSort: string;
  public attackOrderReverse: number;
  public attackPage: number;
  public attackPossible = 0;
  public attackPossibleError: number;
  private attackWarsListInfo: {
    list: {
      membre_id: number;
      username: string;
      level: number;
      diamond_begin: number;
      alliance: number;
      alliance_name: string;
      victory: number;
      xp: number;
      field: number;
      attack_allowed: number;
      fury_allowed: number;
      lightning_allowed: number;
    }[];
    max: number;
    cPage: number;
  };
  public furyInfo: MessageContent;
  public furyPossible = 0;
  public lightningPossible = 0;
  public lightningInfo: MessageContent;
  public nbpp: number;
  public realWaveAttackCheck: {
    ress: object;
    habitation: {
      normal: number;
      palace: number;
      cavern: number;
    };
  };
  public realWaveAttackSum: object;
  public spyInfo: {
    error: number;
    poseidon_wall: number;
    defense_wall: number;
    defenseType: number;
    unitiesNb: number;
    defenseNb: number;
    buildings: string[];
    unities: string[];
    ress: {
      food: number;
      water: number;
      wood: number;
      iron: number;
      stone: number;
      marble: number;
      grapes: number;
      wine: number;
      gold: number;
    };
  };
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

  Object = Object;
  Tools = Tools;

  //Icons
  bleedingEyes = bleedingEye;
  boltIcon = boltIcon;
  dotCircle = dotCircle;
  fireIcon = fireIcon;
  gemIcon = gemIcon;
  gooeyEyedSun = gooeyEyedSun;
  questionCircle = questionCircle;
  sortDown = sortDown;
  sortUP = sortUP;
  swordIcon = swordIcon;

  constructor(
    protected socket: Socket,
    public user: User,
    public translate: TranslateService,
    private scroller: ViewportScroller
  ) {
    /* Mode
     * 0: History
     * 1: Observe with Apollo
     * 2: Spy
     * 3: Prepare to attack
     * 4: Attack
     * 5: Prepare fury
     * 6: Fury
     * 7: Prepare lightning
     * 8: Lightning
     * 9: Spy sanctuary
     *10: Prepare to attack a sanctuary
     *11: Attack sanctuary
     *12: Sanctuary info
     */
    this.attackMode = 0;
    this.attackOrderSort = 'other';
    this.attackOrderReverse = 0;
    this.attackPage = 1;
    this.attackPossibleError = 0;
    //Number of targets by attack page
    this.attackWarsListInfo = {
      list: [],
      max: 0,
      cPage: 0,
    };
    this.furyInfo = new MessageContent();
    this.lightningInfo = new MessageContent();
    this.nbpp = 10;
    this.realWaveAttackCheck = {
      ress: {},
      habitation: {
        normal: 0,
        palace: 0,
        cavern: 0,
      },
    };
    this.realWaveAttackSum = {};
    this.spyInfo = {
      error: 0,
      poseidon_wall: 0,
      defense_wall: 0,
      defenseType: 0,
      unitiesNb: 0,
      defenseNb: 0,
      buildings: [],
      unities: [],
      ress: {
        food: 0,
        water: 0,
        wood: 0,
        iron: 0,
        stone: 0,
        marble: 0,
        grapes: 0,
        wine: 0,
        gold: 0,
      },
    };
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
    this.waveAttackSum = {};
  }

  ngOnInit() {
    this.attackListWarInit();

    this.socket.on('attack', datas => {
      this.attackMode = 4;
      this.attackInfo = new MessageContent({ content: datas });
      this.refreshAttacksWarsPage();
    });
    this.socket.on('attackWarsList', (datas: object) => {
      this.attackWarsListInfo = datas as typeof this.attackWarsListInfo;
      this.attackPage = this.attackWarsListInfo.cPage;
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
    this.socket.on('eye', data => {
      this.setSpy(data);
    });
    this.socket.on('fury', data => {
      this.attackMode = 6;
      this.furyInfo = new MessageContent({ content: data });
      this.refreshAttacksWarsPage();
    });
    this.socket.on('furyPossible', data => {
      this.furyPossible = parseInt(data as string);
    });
    this.socket.on('lightning', (data: { lost_build: object }) => {
      this.attackMode = 8;
      const lost_build = {};
      for (const building in data.lost_build) {
        lost_build[building as keyof typeof lost_build] =
          data.lost_build[building as keyof typeof data.lost_build];
      }
      this.lightningInfo = new MessageContent({ content: lost_build });
      this.refreshAttacksWarsPage();
    });
    this.socket.on('lightningPossible', data => {
      this.lightningPossible = parseInt(data as string);
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
    this.socket.on('realWaveAttackCheck', data => {
      this.realWaveAttackCheck = data;
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

    this.socket.on('refreshAttacksPage', () => {
      this.refreshAttacksWarsPage();
    });
    this.socket.on('spyInfo', data => {
      this.setSpy(data);
    });

    this.socket.on('waveAttackSum', data => {
      this.waveAttackSum = data;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('attack');
    this.socket.removeListener('attackWarsList');
    this.socket.removeListener('attackPossible');
    this.socket.removeListener('eye');
    this.socket.removeListener('fury');
    this.socket.removeListener('furyPossible');
    this.socket.removeListener('lightningPossible');
    this.socket.removeListener('lightning');
    this.socket.removeListener('profile');
    this.socket.removeListener('realWaveAttackCheck');
    this.socket.removeListener('realWaveAttackSum');
    this.socket.removeListener('refreshAttacksPage');
    this.socket.removeListener('spyInfo');
    this.socket.removeListener('waveAttackSum');
  }

  attackListWarInit() {
    this.attackOrderSort = 'other';
    this.attackOrderReverse = 0;

    this.refreshAttacksWarsPage();
    this.socket.emit('realWaveAttackCheck');

    this.socket.emit('msgPage', {
      page: 1,
      category: 4,
    });
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
  getAttackWarsList() {
    return this.attackWarsListInfo.list;
  }
  getAttacksWarsPageNb() {
    return this.attackWarsListInfo.max;
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
  isProtected() {
    if (this.spyInfo.unitiesNb > 0 || this.spyInfo.defenseNb > 0) {
      return true;
    }

    return false;
  }

  launchAttack(id: number) {
    this.attackPossible = -1;
    this.socket.emit('attack', id);
  }

  launchFury(id: number) {
    this.socket.emit('fury', id);
  }

  launchLightning(id: number) {
    this.socket.emit('lightning', id);
  }

  observe(id: number) {
    this.attackMode = 1;

    this.socket.emit('profile', id);
    this.socket.emit('furyPossible', id);
    this.socket.emit('lightningPossible', id);
    this.socket.emit('attackPossible', id);
    this.socket.emit('eye', id);
  }
  pageAttacksWarsLoad(event: Event) {
    const id = (event.target as HTMLInputElement).value;
    this.setAttacksWarsPage(parseInt(id));
  }

  prepareAttack(id: number) {
    this.attackMode = 3;

    this.socket.emit('profile', id);
    this.socket.emit('attackPossible', id);
    this.socket.emit('waveAttackSum');
    this.socket.emit('realWaveAttackSum');
  }
  prepareFury(id: number) {
    this.attackMode = 5;

    this.socket.emit('profile', id);
    this.socket.emit('furyPossible', id);
  }
  prepareLightning(id: number) {
    this.attackMode = 7;

    this.socket.emit('profile', id);
    this.socket.emit('lightningPossible', id);
  }
  setAttacksWarsPage(id: number, i = 0) {
    id += i;
    if (id >= 1 && id <= this.getAttacksWarsPageNb()) {
      this.attackPage = id;
      this.refreshAttacksWarsPage();
    }
  }
  refreshAttacksWarsPage() {
    this.socket.emit('attackWarsList', {
      page: this.attackPage,
      order: this.attackOrderSort,
      reverse: this.attackOrderReverse,
      nbpp: this.nbpp,
    });
  }
  realWaveAttackCheckHabitation() {
    let nb = 0;
    for (const [, qtt] of Object.entries(this.realWaveAttackCheck.habitation)) {
      nb += qtt;
    }
    return nb;
  }
  setOrder(newOrder: string) {
    if (newOrder === this.attackOrderSort) {
      this.attackOrderReverse = (this.attackOrderReverse + 1) % 2;
    }
    this.attackOrderSort = newOrder;
    this.refreshAttacksWarsPage();
  }

  setSpy(data: object) {
    this.attackMode = 1;
    this.spyInfo = data as typeof this.spyInfo;

    setTimeout(() => {
      this.scroller.scrollToAnchor('attackEyeBlock');
    }, 100);
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
