import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { IcIconComponent } from 'src/services/ic-icon.service';

import treasureChest from '@iconify-icons/mdi/treasure-chest';

@Component({
  selector: 'app-treasure-popup',
  templateUrl: './treasure-popup.sub-component.html',
  imports: [
    CommonModule,
    EwIconSubComponent,
    FormsModule,
    IcIconComponent,
    TranslateModule,
  ],
})
export class TreasurePopupSubComponent implements OnInit, OnDestroy {
  @Input() info!: {
    amount: string;
    treasureMode: number;
  };

  public deposit = '';
  public computation = '';
  public taxDeduction: number;
  public treasureHistory: {
    deposit: {
      amount: number;
      date: number;
    };
    pull: {
      amount: number;
      date: number;
    };
  }[];
  public treasureMax: number;

  //Icons
  treasureChest = treasureChest;

  constructor(
    private readonly socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.treasureHistory = [];
    this.taxDeduction = 1;
    this.treasureMax = 200000;
  }

  ngOnInit() {
    this.socket.on('treasureHistory', datas => {
      this.treasureHistory = datas;
    });

    if (this.user.getPropertyNb('level') < 5) {
      this.treasureMax = (this.user.getPropertyNb('level') + 1) * 200000;
    } else if (this.user.getPropertyNb('level') === 5) {
      this.treasureMax = 2000000;
    }

    if (this.user.getPropertyNb('hermes') === 1) {
      this.taxDeduction = 0.8;
      this.treasureMax *= 1.5;
    }

    setTimeout(() => {
      this.deposit = 'deposit';
      this.computation = '2';

      this.socket.emit('treasureHistory');
    }, 0);
  }

  ngOnDestroy() {
    this.socket.removeListener('treasureHistory');
  }

  setTreasure(amount: number) {
    if (this.deposit === 'deposit') {
      this.info.amount = amount.toString();
    } else {
      this.info.amount = this.user.getPropertyNb('treasure').toString();
    }
  }

  setTreasureMode(mode: number) {
    this.info.treasureMode = mode;
  }

  treasureAction() {
    if (this.info.amount && parseFloat(this.info.amount) > 0) {
      if (this.deposit === 'deposit') {
        this.socket.emit('treasureAdd', this.info.amount);
      } else {
        const msg = {
          amount: this.info.amount,
          computation: this.computation,
        };
        this.socket.emit('treasureRemove', msg);
      }
      this.info.amount = '';
    }
  }
}
