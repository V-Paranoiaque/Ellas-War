import { RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { MessageContent } from 'src/services/message.class';
import { FormsModule } from '@angular/forms';

import { AttacksHelpPopupSubComponent } from './attacks-help-popup.sub-component';
import { AttacksHistorySubComponent } from './attacks-history.sub-component';
import { AttacksMenuSubComponent } from './attacks-menu.sub-component';
import { AttacksMessageSubComponent } from './attacks-message.sub-component';
import { AttacksSpyResourcesHelpPopupSubComponent } from './attacks-spy-resources-help-popup.sub-component';
import { AttacksUnitHelpPopupSubComponent } from './attacks-unit-help-popup.sub-component';
import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { FuryMessageSubComponent } from './fury-message.sub-component';
import { IcIconComponent } from 'src/services/ic-icon.service';
import { LostMessageSubComponent } from './lost-message.sub-component';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

import bleedingEye from '@iconify/icons-game-icons/bleeding-eye';
import boltIcon from '@iconify/icons-fa6-solid/bolt';
import dotCircle from '@iconify/icons-fa6-solid/circle-dot';
import fireIcon from '@iconify/icons-fa6-solid/fire';
import gemIcon from '@iconify/icons-fa6-regular/gem';
import gooeyEyedSun from '@iconify/icons-game-icons/gooey-eyed-sun';
import plusIcon from '@iconify/icons-bi/plus';
import questionCircle from '@iconify/icons-fa6-regular/circle-question';
import search from '@iconify/icons-fa6-solid/magnifying-glass';
import shieldShaded from '@iconify/icons-bi/shield-shaded';
import sortDown from '@iconify/icons-fa6-solid/sort-down';
import sortUP from '@iconify/icons-fa6-solid/sort-up';
import swordIcon from '@iconify/icons-vaadin/sword';
import twotoneFence from '@iconify/icons-ic/twotone-fence';

@Component({
  templateUrl: './attacks.component.html',
  styleUrls: ['./attacks.component.css'],
  imports: [
    AttacksHelpPopupSubComponent,
    AttacksHistorySubComponent,
    AttacksMenuSubComponent,
    AttacksMessageSubComponent,
    AttacksSpyResourcesHelpPopupSubComponent,
    AttacksUnitHelpPopupSubComponent,
    CommonModule,
    EwIconSubComponent,
    FormsModule,
    FuryMessageSubComponent,
    IcIconComponent,
    LostMessageSubComponent,
    MainLeftSubComponent,
    MainRightSubComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class AttacksComponent implements OnInit, OnDestroy {
  protected socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);
  private readonly scroller = inject(ViewportScroller);

  public attackInfo = new MessageContent();
  public attackMode: number;
  public attackOrderSort: string;
  public attackOrderReverse: number;
  public attackPage: number;
  public attackPossible = 0;
  public attackPossibleError: number;
  private attackListInfo: {
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

  public attackClosestMax = { membre_id: 0, username: '', field: 0 };
  public attackClosestMin = { membre_id: 0, username: '', field: 0 };
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
  public attackSearchError = 0;
  public attackSearchText = '';

  Object = Object;
  Tools = Tools;

  //Icons
  bleedingEyes = bleedingEye;
  boltIcon = boltIcon;
  dotCircle = dotCircle;
  fireIcon = fireIcon;
  gemIcon = gemIcon;
  gooeyEyedSun = gooeyEyedSun;
  plusIcon = plusIcon;
  questionCircle = questionCircle;
  search = search;
  shieldShaded = shieldShaded;
  sortDown = sortDown;
  sortUP = sortUP;
  swordIcon = swordIcon;
  twotoneFence = twotoneFence;

  constructor() {
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
    this.attackListInfo = {
      list: [],
      max: 0,
      cPage: 0,
    };
    this.attackOrderSort = 'other';
    this.attackOrderReverse = 0;
    this.attackPage = 1;
    this.attackPossibleError = 0;
    //Number of targets by attack page
    this.nbpp = 10;

    this.furyInfo = new MessageContent();
    this.lightningInfo = new MessageContent();
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
    this.realWaveAttackSum = {};

    this.realWaveAttackCheck = {
      ress: {},
      habitation: {
        normal: 0,
        palace: 0,
        cavern: 0,
      },
    };
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.attackListInit();

    this.socket.on('attack', datas => {
      this.attackMode = 4;
      this.attackInfo = new MessageContent({ content: datas });
      this.refreshAttacksPage();
    });

    this.socket.on('attackClosestMax', datas => {
      this.attackClosestMax = datas as typeof this.attackClosestMax;
    });

    this.socket.on('attackClosestMin', datas => {
      this.attackClosestMin = datas as typeof this.attackClosestMin;
    });

    this.socket.on('attackList', (datas: object) => {
      this.attackListInfo = datas as typeof this.attackListInfo;
      this.attackPage = this.attackListInfo.cPage;
      this.socket.emit('attackClosestMax');
      this.socket.emit('attackClosestMin');
    });
    this.socket.on('attackSearchError', (data: number) => {
      this.attackSearchError = data;
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
      this.refreshAttacksPage();
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
      this.refreshAttacksPage();
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
      this.refreshAttacksPage();
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
    this.socket.removeListener('attackList');
    this.socket.removeListener('attackSearchError');
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

  attackListInit() {
    this.attackOrderSort = 'other';
    this.attackOrderReverse = 0;

    this.refreshAttacksPage();
    this.socket.emit('realWaveAttackCheck');

    this.socket.emit('msgPage', {
      page: 1,
      category: 4,
    });
  }

  getAttackList() {
    return this.attackListInfo.list;
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

  getAttacksPageNb() {
    return this.attackListInfo.max;
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
  pageAttacksLoad(event: Event) {
    const id = (event.target as HTMLInputElement).value;
    this.setAttacksPage(parseInt(id));
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

  setAttacksPage(id: number, i = 0) {
    id += i;
    if (id >= 1 && id <= this.getAttacksPageNb()) {
      this.attackPage = id;
      this.refreshAttacksPage();
    }
  }

  refreshAttacksPage() {
    if (this.attackSearchError === 0) {
      this.socket.emit('attackList', {
        page: this.attackPage,
        order: this.attackOrderSort,
        reverse: this.attackOrderReverse,
        nbpp: this.nbpp,
      });
    } else {
      this.socket.emit('attackSearch', {
        order: this.attackOrderSort,
        reverse: this.attackOrderReverse,
        username: this.attackSearchText,
      });
    }
  }

  attackSearch() {
    this.attackSearchText = this.attackSearchText.trim();
    this.attackSearchError = 0;

    if (this.attackSearchText.length === 0) {
      this.refreshAttacksPage();
    } else {
      this.socket.emit('attackSearch', {
        order: this.attackOrderSort,
        reverse: this.attackOrderReverse,
        username: this.attackSearchText,
      });
    }
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
    this.refreshAttacksPage();
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
