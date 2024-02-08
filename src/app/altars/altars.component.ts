import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

import checkIcon from '@iconify/icons-mdi/check';
import times from '@iconify/icons-fa6-solid/xmark';

@Component({
  selector: 'app-altars',
  templateUrl: './altars.component.html',
  styleUrls: ['./altars.component.css'],
})
export class AltarsComponent implements OnInit, OnDestroy {
  public altarQuestConditionDivineunits = {
    food: { quantity: 0, validated: 0, currently: 0 },
    grapes: { quantity: 0, validated: 0, currently: 0 },
    marble: { quantity: 0, validated: 0, currently: 0 },
    gold: { quantity: 0, validated: 0, currently: 0 },
    mint: { quantity: 0, validated: 0, currently: 0 },
    prod: { quantity: 0, validated: 0, currently: 0 },
    war: { quantity: 0, validated: 0, currently: 0 },
  };
  public altarQuestConditionGaia = {
    iron: { quantity: 0, validated: 0, currently: 0 },
    grapes: { quantity: 0, validated: 0, currently: 0 },
    gold: { quantity: 0, validated: 0, currently: 0 },
    xp: { quantity: 0, validated: 0, currently: 0 },
    defense: { quantity: 0, validated: 0, currently: 0 },
  };
  public altarQuestConditionHestia = {
    water: { quantity: 0, validated: 0, currently: 0 },
    food: { quantity: 0, validated: 0, currently: 0 },
    grapes: { quantity: 0, validated: 0, currently: 0 },
    wine: { quantity: 0, validated: 0, currently: 0 },
    placenactu: { quantity: 0, validated: 0, currently: 0 },
    placepactu: { quantity: 0, validated: 0, currently: 0 },
    placecactu: { quantity: 0, validated: 0, currently: 0 },
    totalplace: { quantity: 0, validated: 0, currently: 0 },
  };
  public altarQuestConditionPrometheus = {
    water: { quantity: 0, validated: 0, currently: 0 },
    wine: { quantity: 0, validated: 0, currently: 0 },
    gold: { quantity: 0, validated: 0, currently: 0 },
    alliance: { quantity: 0, validated: 0, currently: 0 },
    victory: { quantity: 0, validated: 0, currently: 0 },
    hf: { quantity: 0, validated: 0, currently: 0 },
  };

  checkIcon = checkIcon;
  times = times;

  constructor(
    protected socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {}
  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.emit('altarQuestConditionDivineunits');
    this.socket.emit('altarQuestConditionGaia');
    this.socket.emit('altarQuestConditionHestia');
    this.socket.emit('altarQuestConditionPrometheus');

    this.socket.on('altarQuestConditionDivineunits', data => {
      this.altarQuestConditionDivineunits = data;
    });
    this.socket.on('altarQuestConditionGaia', data => {
      this.altarQuestConditionGaia = data;
    });
    this.socket.on('altarQuestConditionHestia', data => {
      this.altarQuestConditionHestia = data;
    });
    this.socket.on('altarQuestConditionPrometheus', data => {
      this.altarQuestConditionPrometheus = data;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('altarQuestConditionDivineunits');
    this.socket.removeListener('altarQuestConditionGaia');
    this.socket.removeListener('altarQuestConditionHestia');
    this.socket.removeListener('altarQuestConditionPrometheus');
  }

  validateRes(altar: string, res: string) {
    this.socket.emit('altarQuestValidateRes', {
      altar: altar,
      res: res,
    });
  }

  altarCondition(name: string) {
    let condition = null;

    switch (name) {
      case 'divine_units':
        condition = this.altarQuestConditionDivineunits;
        break;
      case 'gaia_defender':
        condition = this.altarQuestConditionGaia;
        break;
      case 'hestia':
        condition = this.altarQuestConditionHestia;
        break;
      case 'prometheus':
        condition = this.altarQuestConditionPrometheus;
        break;
    }

    if (!condition) {
      return false;
    }

    for (const [key] of Object.entries(condition)) {
      if (
        (condition[key as keyof typeof condition] as { validated: number })
          .validated == 0
      ) {
        return false;
      }
    }
    return true;
  }

  validate(altar: string) {
    this.socket.emit('altarQuestValidate', {
      altar: altar,
    });
  }
}
