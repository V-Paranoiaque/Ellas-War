import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';

import bleedingEye from '@iconify/icons-game-icons/bleeding-eye';
import clipboardCheck from '@iconify/icons-fa6-solid/clipboard-check';
import boltIcon from '@iconify/icons-fa6-solid/bolt';
import dotCircle from '@iconify/icons-fa6-solid/circle-dot';
import fireIcon from '@iconify/icons-fa6-solid/fire';
import gemIcon from '@iconify/icons-fa6-regular/gem';
import gooeyEyedSun from '@iconify/icons-game-icons/gooey-eyed-sun';
import plusIcon from '@iconify/icons-bi/plus';
import questionCircle from '@iconify/icons-fa6-regular/circle-question';
import search from '@iconify/icons-fa6-solid/magnifying-glass';
import share from '@iconify/icons-bi/share';
import shieldShaded from '@iconify/icons-bi/shield-shaded';
import sortDown from '@iconify/icons-fa6-solid/sort-down';
import sortUP from '@iconify/icons-fa6-solid/sort-up';
import swordIcon from '@iconify/icons-vaadin/sword';
import twotoneFence from '@iconify/icons-ic/twotone-fence';
import { Message, MessageContent } from 'src/services/message.class';

@Component({
  templateUrl: './attacks.component.html',
  styleUrls: ['./attacks.component.css'],
})
export class AttacksComponent implements OnInit, OnDestroy {
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
  public attackOrderSort: string;
  public attackOrderReverse: number;
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
  public attackPage: number;

  public attackClosestMax = { membre_id: 0, username: '', field: 0 };
  public attackClosestMin = { membre_id: 0, username: '', field: 0 };
  public attackInfo = new MessageContent();
  public attackMode: number;
  public currentMsg: Message;
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
  public realWaveAttackCheck: {
    ress: object;
    habitation: {
      normal: number;
      palace: number;
      cavern: number;
    };
  };
  public menuMode: number;
  public myAllianceWar: object[];
  public nbpp: number;
  public furyInfo: MessageContent;
  public furyPossible = 0;
  public lightningPossible = 0;
  public lightningInfo: MessageContent;
  public linkSaved: number;
  public msgList: Message[];
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
  public attackPossible = 0;
  public attackPossibleError: number;
  public waveAttackSum: object;
  public realWaveAttackSum: object;
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

  public attackSearchError = 0;
  public attackSearchText = '';

  Object = Object;
  parseInt = parseInt;
  Tools = Tools;
  Math = Math;

  //Icons
  bleedingEyes = bleedingEye;
  boltIcon = boltIcon;
  clipboardCheck = clipboardCheck;
  dotCircle = dotCircle;
  fireIcon = fireIcon;
  gemIcon = gemIcon;
  gooeyEyedSun = gooeyEyedSun;
  plusIcon = plusIcon;
  questionCircle = questionCircle;
  search = search;
  share = share;
  shieldShaded = shieldShaded;
  sortDown = sortDown;
  sortUP = sortUP;
  swordIcon = swordIcon;
  twotoneFence = twotoneFence;

  constructor(
    protected socket: Socket,
    public user: User,
    public translate: TranslateService,
    private scroller: ViewportScroller
  ) {
    this.attackWarsListInfo = {
      list: [],
      max: 0,
      cPage: 0,
    };
    this.attackListInfo = {
      list: [],
      max: 0,
      cPage: 0,
    };
    this.attackPage = 1;
    this.attackOrderSort = 'other';
    this.attackOrderReverse = 0;

    this.linkSaved = 0;
    this.msgList = [];
    this.attackPossibleError = 0;

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
    this.menuMode = 0;
    this.currentMsg = new Message();
    //Number of targets by attack page
    this.nbpp = 10;

    this.furyInfo = new MessageContent();
    this.lightningInfo = new MessageContent();
    this.sanctuariesAttackInfo = new MessageContent();
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
    this.myAllianceWar = [];
    this.realWaveAttackCheck = {
      ress: {},
      habitation: {
        normal: 0,
        palace: 0,
        cavern: 0,
      },
    };
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
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.attackListInit();
    this.socket.emit('myAllianceWar');

    this.socket.on('attack', datas => {
      this.attackMode = 4;
      this.attackInfo = new MessageContent({ content: datas });

      this.refreshAttacksPage();
      this.refreshAttacksWarsPage();
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
    this.socket.on('attackWarsList', (datas: object) => {
      this.attackWarsListInfo = datas as typeof this.attackWarsListInfo;
      this.attackPage = this.attackWarsListInfo.cPage;
    });
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
    this.socket.on('furyPossible', data => {
      this.furyPossible = parseInt(data as string);
    });
    this.socket.on('lightningPossible', data => {
      this.lightningPossible = parseInt(data as string);
    });
    this.socket.on('eye', data => {
      this.setSpy(data);
    });

    this.socket.on('fury', data => {
      this.attackMode = 6;
      this.furyInfo = new MessageContent({ content: data });
    });

    this.socket.on('lightning', (data: { lost_build: object }) => {
      this.attackMode = 8;
      const lost_build = {};
      for (const building in data.lost_build) {
        lost_build[building as keyof typeof lost_build] =
          data.lost_build[building as keyof typeof data.lost_build];
      }
      this.lightningInfo = new MessageContent({ content: lost_build });
    });

    this.socket.on('spyInfo', data => {
      this.setSpy(data);
    });

    this.socket.on('waveAttackSum', data => {
      this.waveAttackSum = data;
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

    this.socket.on('realWaveAttackCheck', data => {
      this.realWaveAttackCheck = data;
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

    this.socket.on('myAllianceWar', data => {
      this.myAllianceWar = data;
    });

    this.socket.on('msgPage', (newMsgList: { list: object[] }) => {
      this.msgList = newMsgList.list as typeof this.msgList;
    });

    this.socket.on('msgInfo', msgInfo => {
      this.currentMsg = msgInfo;
    });

    this.socket.on('refreshAttacksPage', () => {
      this.refreshAttacksPage();
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('attack');
    this.socket.removeListener('attackList');
    this.socket.removeListener('attackSearchError');
    this.socket.removeListener('attackWarsList');
    this.socket.removeListener('diamondInfo');
    this.socket.removeListener('diamondRankingPlayers');
    this.socket.removeListener('diamondRankingAlliance');
    this.socket.removeListener('profile');
    this.socket.removeListener('attackPossible');
    this.socket.removeListener('furyPossible');
    this.socket.removeListener('lightningPossible');
    this.socket.removeListener('eye');
    this.socket.removeListener('fury');
    this.socket.removeListener('lightning');
    this.socket.removeListener('spyInfo');
    this.socket.removeListener('waveAttackSum');
    this.socket.removeListener('realWaveAttackSum');
    this.socket.removeListener('realWaveAttackCheck');
    this.socket.removeListener('refreshAttacksPage');
    this.socket.removeListener('sanctuariesList');
    this.socket.removeListener('sanctuariesAttack');
    this.socket.removeListener('sanctuariesEye');
    this.socket.removeListener('sanctuariesDefense');
    this.socket.removeListener('sanctuariesSpy');
    this.socket.removeListener('sanctuariesInfo');
    this.socket.removeListener('sanctuariesInfoRefresh');
    this.socket.removeListener('myAllianceWar');
    this.socket.removeListener('msgPage');
    this.socket.removeListener('msgInfo');
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

  copyLink() {
    this.linkSaved = 1;

    setTimeout(() => {
      this.linkSaved = 0;
    }, 2000);
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

  currentMsgReset() {
    this.currentMsg = new Message();
  }

  getAttackList() {
    if (this.attackListInfo.list) {
      return this.attackListInfo.list;
    } else {
      return [];
    }
  }

  getAttackWarsList() {
    if (this?.attackWarsListInfo?.list) {
      return this.attackWarsListInfo.list;
    } else {
      return [];
    }
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

  getAttacksWarsPageNb() {
    return this.attackWarsListInfo.max;
  }

  getCurrentMsg() {
    return this.currentMsg;
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

  pageAttacksLoad(event: Event) {
    const id = (event?.target as HTMLInputElement)?.value;
    this.setAttacksPage(parseInt(id));
  }
  pageAttacksWarsLoad(event: Event) {
    const id = (event?.target as HTMLInputElement)?.value;
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
  }
  prepareLightning(id: number) {
    this.attackMode = 7;

    this.socket.emit('profile', id);
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

  messageLoad(msg: Message) {
    this.linkSaved = 0;

    if (msg.msg_id > 0) {
      if (!msg.msg_read) {
        msg.msg_read = 1;
      }
      this.socket.emit('msgInfo', msg.msg_id);
    } else {
      this.currentMsgReset();
    }
  }

  observe(id: number) {
    this.attackMode = 1;

    this.socket.emit('profile', id);
    this.socket.emit('furyPossible', id);
    this.socket.emit('lightningPossible', id);
    this.socket.emit('attackPossible', id);
    this.socket.emit('eye', id);
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

  setAttacksPage(id: number, i = 0) {
    id += i;
    if (id >= 1 && id <= this.getAttacksPageNb()) {
      this.attackPage = id;
      this.refreshAttacksPage();
    }
  }

  setAttacksWarsPage(id: number, i = 0) {
    id += i;
    if (id >= 1 && id <= this.getAttacksWarsPageNb()) {
      this.attackPage = id;
      this.refreshAttacksWarsPage();
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

  refreshAttacksWarsPage() {
    this.socket.emit('attackWarsList', {
      page: this.attackPage,
      order: this.attackOrderSort,
      reverse: this.attackOrderReverse,
      nbpp: this.nbpp,
    });
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

  setMenuMode(id: number) {
    switch (id) {
      case 0:
        this.attackPage = 1;
        this.attackMode = 0;
        this.attackOrderSort = 'other';
        this.attackOrderReverse = 0;
        this.attackSearchError = 0;
        this.attackSearchText = '';
        this.attackListInit();
        this.currentMsgReset();
        this.sanctuariesSpyInfo = {
          error: 0,
          id: 0,
          sanctuaries_name: '',
          unitiesNb: 0,
          unities: [],
        };
        break;
      case 1:
        this.attackMode = 0;
        if (
          this.user.getPropertyNb('level') === 0 &&
          this.user.getPropertyNb('quest') === 11
        ) {
          this.user.questValidateAuto();
        }
        break;
      case 2:
        this.attackMode = 0;
        this.socket.emit('diamondInfo');
        this.socket.emit('diamondRankingPlayers');
        this.socket.emit('diamondRankingAlliance');
        break;
      case 3:
        this.socket.emit('sanctuariesList');
        this.socket.emit('waveAttackSum');
        this.socket.emit('realWaveAttackSum');
        break;
      case 4:
        this.attackPage = 1;
        this.attackOrderSort = 'other';
        this.attackOrderReverse = 0;
        this.attackMode = 0;
        this.attackListWarInit();
        this.sanctuariesSpyInfo = {
          error: 0,
          id: 0,
          sanctuaries_name: '',
          unitiesNb: 0,
          unities: [],
        };
        break;
    }
    this.menuMode = id;
  }

  shareMsg() {
    this.socket.emit('msgShare', this.currentMsg.msg_id);
    this.currentMsg.msg_shared = (this.currentMsg.msg_shared + 1) % 2;
  }

  setSpy(data: object) {
    this.attackMode = 1;
    this.spyInfo = data as typeof this.spyInfo;

    setTimeout(() => {
      this.scroller.scrollToAnchor('attackEyeBlock');
    }, 100);
  }

  setOrder(newOrder: string) {
    if (newOrder === this.attackOrderSort) {
      this.attackOrderReverse = (this.attackOrderReverse + 1) % 2;
    }
    this.attackOrderSort = newOrder;

    if (this.menuMode === 0) {
      this.refreshAttacksPage();
    } else {
      this.refreshAttacksWarsPage();
    }
  }

  spy(id: number) {
    this.attackMode = 2;

    this.socket.emit('profile', id);
    this.socket.emit('furyPossible', id);
    this.socket.emit('lightningPossible', id);
    this.socket.emit('attackPossible', id);
    this.socket.emit('spyInfo', id);
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

  realWaveAttackCheckHabitation() {
    let nb = 0;
    for (const [, qtt] of Object.entries(this.realWaveAttackCheck.habitation)) {
      nb += qtt;
    }
    return nb;
  }

  isProtected() {
    if (this.spyInfo.unitiesNb > 0 || this.spyInfo.defenseNb > 0) {
      return true;
    }

    return false;
  }
}
