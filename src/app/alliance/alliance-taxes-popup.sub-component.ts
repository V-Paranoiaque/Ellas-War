import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EwIconSubComponent } from 'src/services/ew-icon.service';

@Component({
  selector: 'app-alliance-taxes-popup',
  templateUrl: './alliance-taxes-popup.sub-component.html',
  imports: [CommonModule, EwIconSubComponent, FormsModule, TranslateModule],
})
export class AllianceTaxesPopupSubComponent implements OnInit, OnDestroy {
  @Input() taxes!: {
    drachma: number;
    food: number;
    water: number;
    wood: number;
    stone: number;
    iron: number;
    marble: number;
    grapes: number;
    wine: number;
    gold: number;
  };

  public myAllianceProfile!: { fee_min: number };

  Object = Object;
  environment = environment;

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.myAllianceProfile = { fee_min: 0 };
  }

  ngOnInit() {
    this.socket.emit('myAllianceProfile');

    this.socket.on('myAllianceProfile', (data: object) => {
      this.myAllianceProfile = data as typeof this.myAllianceProfile;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('myAllianceProfile');
  }

  getMax(res: string) {
    const datas = this.user.getProperty('datas') as {
      alliance: { ress: object };
    };
    return datas.alliance.ress[res as keyof typeof datas.alliance.ress];
  }

  saveTaxes() {
    const ress = {
      lvlmin: this.myAllianceProfile.fee_min,
      drachma: this.taxes.drachma,
      food: this.taxes.food,
      water: this.taxes.water,
      wood: this.taxes.wood,
      stone: this.taxes.stone,
      iron: this.taxes.iron,
      marble: this.taxes.marble,
      grapes: this.taxes.grapes,
      wine: this.taxes.wine,
      gold: this.taxes.gold,
    };
    this.socket.emit('myAllianceTax', ress);
  }
}
