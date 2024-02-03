import { Component, Output, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { UserComponent as User } from '../../services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ToolsComponent as Tools } from '../../services/tools.service';

import questionCircle from '@iconify/icons-fa6-regular/circle-question';
import shieldShaded from '@iconify/icons-bi/shield-shaded';
import splitIcon from '@iconify/icons-carbon/split';
import swordIcon from '@iconify/icons-vaadin/sword';
import times from '@iconify/icons-fa6-solid/xmark';

@Component({
  templateUrl: './strategies.component.html',
})
export class StrategiesComponent implements OnInit, OnDestroy {
  @Output()
  public armyInfo = {
    code: '',
    attack: 0,
    defense: 0,
    type: 0,
    lvlmini: 0,
    rEngageNb: 0,
    rLiberateNb: 0,
    engageNb: '',
    rEngagePossible: 0,
    liberatenb: '',
    free: 0,
    placen: 0,
    placep: 0,
    placec: 0,
    resaler: new Map(),
    resale: 0,
    nbmax: 0,
    temple: {
      artemis: 0,
      hephaestus: 0,
      dionysus: 0,
      ares: 0,
      zeus: 0,
      hades: 0,
    },
    cost: new Map(),
    consumption: new Map(),
    camp_level: 0,
    power: '',
    power_level: 0,
    error: 0,
    building: {
      militarycamp: 0,
    },
    condition: {
      ranking: 0,
    },
  };
  public buildingInfo = {
    code: 'mint',
    type: 0,
    defense: 0,
    field: 0,
    cost: new Map(),
    destruct: new Map(),
    production: new Map(),
    consumption: new Map(),
    placen: 0,
    placep: 0,
    placec: 0,
    nbmax: 0,
    nbmin: 0,
    buildNb: '',
    destructNb: '',
    rBuildNb: '',
    rDestructNb: '',
    rBuildPossible: 0,
    errorBuilding: 0,
  };

  public type: string;

  public waveAttackDropList: string[] = [];
  public waveAttackList: {
    code: string;
    lvlmini: number;
    consumption: object;
    attack: number;
    defense: number;
    type: number;
  }[][];
  public waveAttackPower: number;
  public waveAttackUnit = new Map<string, number>();

  public waveDefenseDropList: string[] = [];
  public waveDefenseList: {
    code: string;
    lvlmini: number;
    consumption: object;
    attack: number;
    defense: number;
    type: number;
  }[][];
  public waveDefensePower: number;
  public waveDefenseUnit = new Map<string, number>();
  public defenseWallStrength: number;
  public wallDefense: number;

  public emptyWave: {
    code: string;
    lvlmini: number;
    consumption: object;
    attack: number;
    defense: number;
    type: number;
  }[] = [];

  public waveAttackMax: number;
  public waveDefenseMax: number;
  public waveUnit = {
    nb: 0,
    nbUnit: 0,
    wave: 0,
    strategy: 0,
    code: '',
  };

  Tools = Tools;

  questionCircle = questionCircle;
  shieldShaded = shieldShaded;
  splitIcon = splitIcon;
  swordIcon = swordIcon;
  times = times;

  constructor(
    private socket: Socket,
    private route: ActivatedRoute,
    public user: User,
    public translate: TranslateService
  ) {
    this.waveAttackList = [];
    this.waveAttackPower = 0;

    this.waveDefenseList = [];
    this.waveDefensePower = 0;
    this.defenseWallStrength = 0;
    this.wallDefense = 0;

    this.type = '';

    //How many waves, maximum
    this.waveAttackMax = 10;
    this.waveDefenseMax = 10;
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.route.paramMap.subscribe(params => {
      this.type = params.get('type') ?? '';

      if (this.type && this.type === 'defense') {
        this.socket.emit('waveDefenseList');
        this.socket.emit('defenseWallStrength');
        this.socket.emit('wallDefense');
      } else {
        this.socket.emit('waveAttackList');
      }
    });

    this.socket.on(
      'waveAttackList',
      (data: { list: object[]; power: number }) => {
        if (data.list.length > 0) {
          this.waveAttackProcess(data);
        } else {
          this.waveAttackList = [[]];
          this.waveAttackUnit = new Map<string, number>();

          this.waveAttackDropList = ['wave-attack-0', 'wave-attack-1'];
        }
      }
    );

    this.socket.on(
      'waveDefenseList',
      (data: { list: object[]; power: number }) => {
        if (data.list.length > 0) {
          this.waveDefenseProcess(data);
        } else {
          this.waveDefenseList = [[]];
          this.waveDefenseUnit = new Map<string, number>();

          this.waveDefenseDropList = ['wave-defense-0', 'wave-defense-1'];
        }
      }
    );

    this.socket.on('defenseWallStrength', (data: number) => {
      this.defenseWallStrength = data;
    });
    this.socket.on('wallDefense', (data: number) => {
      this.wallDefense = data;
    });
    this.socket.on('engage', () => {
      this.socket.emit('waveAttackList');
      this.socket.emit('waveDefenseList');
    });
    this.socket.on('waveRefresh', () => {
      this.socket.emit('waveAttackList');
      this.socket.emit('waveDefenseList');
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('engage');
    this.socket.removeListener('defenseWallStrength');
    this.socket.removeListener('wallDefense');
    this.socket.removeListener('waveAttackList');
    this.socket.removeListener('waveDefenseList');
    this.socket.removeListener('waveRefresh');
  }

  onDropAttack(
    event: CdkDragDrop<
      {
        code: string;
        lvlmini: number;
        consumption: object;
        attack: number;
        defense: number;
        type: number;
      }[]
    >
  ) {
    const wavePrevious = parseInt(event.previousContainer.id.split('-')[2]);
    const waveNew = parseInt(event.container.id.split('-')[2]);
    const unit = event.item.element.nativeElement.id.split('-')[0];
    let nb = this.user.getPropertyNb(unit);

    if (this.waveAttackUnit.get(unit)!) {
      nb -= this.waveAttackUnit.get(unit)!;
    }

    if (wavePrevious === waveNew) {
      return;
    }

    if (wavePrevious === 0) {
      const msg = {
        unit: unit,
        wave: waveNew,
        nb: nb,
      };
      this.socket.emit('waveAttackNew', msg);
      this.waveAttackUnit.set(unit, this.user.getPropertyNb(unit));
    } else if (waveNew === 0) {
      const msg = {
        unit: unit,
        wave: wavePrevious,
      };
      this.socket.emit('waveAttackDelete', msg);
    } else {
      const msg = {
        unit: unit,
        previous: wavePrevious,
        wave: waveNew,
      };
      this.socket.emit('waveAttackMove', msg);
    }
  }

  onDropDefense(
    event: CdkDragDrop<
      {
        code: string;
        lvlmini: number;
        consumption: object;
        attack: number;
        defense: number;
        type: number;
      }[]
    >
  ) {
    const wavePrevious = parseInt(event.previousContainer.id.split('-')[2]);
    const waveNew = parseInt(event.container.id.split('-')[2]);
    const unit = event.item.element.nativeElement.id.split('-')[0];
    let nb = this.user.getPropertyNb(unit);

    if (this.waveDefenseUnit.get(unit)) {
      nb -= this.waveDefenseUnit.get(unit)!;
    }

    if (wavePrevious === waveNew) {
      return;
    }

    if (wavePrevious === 0) {
      const msg = {
        unit: unit,
        wave: waveNew,
        nb: nb,
      };
      this.socket.emit('waveDefenseNew', msg);
      this.waveDefenseUnit.set(unit, this.user.getPropertyNb(unit));
    } else if (waveNew === 0) {
      const msg = {
        unit: unit,
        wave: wavePrevious,
      };
      this.socket.emit('waveDefenseDelete', msg);
    } else {
      const msg = {
        unit: unit,
        previous: wavePrevious,
        wave: waveNew,
      };
      this.socket.emit('waveDefenseMove', msg);
    }
  }

  selectArmy(name: string) {
    const datas = this.user.getProperty('datas') as { army: object };

    this.armyInfo = datas.army[name as keyof typeof datas.army];
    this.armyInfo.engageNb = '';
    this.armyInfo.liberatenb = '';
    this.armyInfo.resaler = new Map();
    this.armyInfo.rEngageNb = 0;
    this.armyInfo.rLiberateNb = 0;
    this.armyInfo.rEngagePossible = 0;
    this.armyInfo.error = 0;

    this.socket.emit('engagePossible', name);

    for (const res in this.armyInfo.cost) {
      this.armyInfo.resaler.set(
        res,
        this.armyInfo.cost.get(res) * this.armyInfo.resale
      );
    }
  }
  selectBuilding(name: string) {
    const datas = this.user.getProperty('datas') as { building: object };

    this.buildingInfo = datas.building[name as keyof typeof datas.building];
    this.buildingInfo.buildNb = '';
    this.buildingInfo.destructNb = '';
    this.buildingInfo.destruct = new Map();
    this.buildingInfo.rBuildNb = '';
    this.buildingInfo.rDestructNb = '';
    this.buildingInfo.rBuildPossible = 0;
    this.buildingInfo.errorBuilding = 0;

    this.socket.emit('buildPossible', name);

    for (const res in this.buildingInfo.cost) {
      this.buildingInfo.destruct.set(
        res,
        this.buildingInfo.cost.get(res) * 0.6
      );
    }
  }

  waveAttackProcess(data: { list: object[]; power: number }) {
    this.waveAttackList = data.list as typeof this.waveAttackList;
    this.waveAttackPower = data.power;
    this.waveAttackUnit = new Map<string, number>();

    this.waveAttackDropList = [];
    this.waveAttackDropList.push('wave-attack-0');

    const waveNb = data.list.length;
    for (let i = 1; i <= waveNb; i++) {
      for (const unit in this.waveAttackList[i]) {
        if (Object.hasOwn(this.waveAttackList[i], unit)) {
          if (!this.waveAttackUnit.get(unit)!) {
            this.waveAttackUnit.set(unit, 0);
          }
          this.waveAttackUnit.set(
            unit,
            this.waveAttackUnit.get(unit)! +
              this.getWaveUnit(this.waveAttackList[i], unit)
          );
        }
      }
      this.waveAttackDropList.push('wave-attack-' + i);
    }
    if (data.list.length < this.waveAttackMax) {
      this.waveAttackDropList.push('wave-attack-' + data.list.length);
    }
  }

  waveDefenseProcess(data: { list: object[]; power: number }) {
    this.waveDefenseList = data.list as typeof this.waveDefenseList;
    this.waveDefensePower = data.power;
    this.waveDefenseUnit = new Map<string, number>();

    this.waveDefenseDropList = [];
    this.waveDefenseDropList.push('wave-defense-0');

    const waveNb = data.list.length;
    for (let i = 1; i <= waveNb; i++) {
      for (const unit in this.waveDefenseList[i]) {
        if (Object.hasOwn(this.waveDefenseList[i], unit)) {
          if (!this.waveDefenseUnit.get(unit)) {
            this.waveDefenseUnit.set(unit, 0);
          }
          this.waveDefenseUnit.set(
            unit,
            this.waveDefenseUnit.get(unit)! +
              this.getWaveUnit(this.waveDefenseList[i], unit)
          );
        }
      }
      this.waveDefenseDropList.push('wave-defense-' + i);
    }
    if (data.list.length < this.waveDefenseMax) {
      this.waveDefenseDropList.push('wave-defense-' + data.list.length);
    }
  }

  waveAttackDelete(unit: string, wave: number) {
    const msg = {
      unit: unit,
      wave: wave,
    };
    this.socket.emit('waveAttackDelete', msg);
  }

  waveDefenseDelete(unit: string, wave: number) {
    const msg = {
      unit: unit,
      wave: wave,
    };
    this.socket.emit('waveDefenseDelete', msg);
  }

  setWaveUnit(army: object, nb: number, wave: number, type: number) {
    this.waveUnit = army as typeof this.waveUnit;
    this.waveUnit.nb = nb;
    this.waveUnit.nbUnit = nb;
    this.waveUnit.wave = wave;
    this.waveUnit.strategy = type;
  }

  getWaveUnit(wave: object, code: string) {
    return parseInt(wave[code as keyof typeof wave] as string);
  }
}
