import { Component, Input } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

import { EwIconSubComponent } from 'src/services/ew-icon.service';

@Component({
  selector: 'app-sanctuary-strength-update-popup',
  templateUrl: './sanctuary-strength-update-popup.sub-component.html',
  imports: [CommonModule, EwIconSubComponent, TranslateModule],
})
export class SanctuaryStrengthUpdatePopupSubComponent {
  @Input() info: {
    sanctuaries_id: number;
    sanctuaries_name: string;
    sanctuaries_power: number;
    price: object;
  };

  Number = Number;
  Math = Math;

  constructor(
    private readonly socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.info = {
      sanctuaries_id: 0,
      sanctuaries_name: '',
      sanctuaries_power: 0,
      price: {},
    };
  }

  canUpdate() {
    if (Object.keys(this.info.price).length > 0) {
      if (this.info.sanctuaries_power >= 125) {
        return false;
      }

      for (const resource of Object.keys(this.info.price)) {
        if (
          this.info.price[resource as keyof typeof this.info.price] >
          this.user.getPropertyNb(resource)
        ) {
          return false;
        }
      }
    }
    return true;
  }

  strengthen() {
    this.socket.emit('sanctuariesStrengthen', this.info.sanctuaries_id);
  }
}
