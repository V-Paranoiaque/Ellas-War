import { Component } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-temple-popup',
  templateUrl: './temple-popup.sub-component.html',
})
export class TemplePopupSubComponent {
  public temple: number = 0;
  public price: { resource: string; quantity: number }[] = [];

  constructor(
    protected socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {}

  setTemple(id: number) {
    if (id === this.temple) {
      this.temple = 0;
    } else {
      this.temple = id;
    }
  }

  canBuild() {
    for (const i in this.price) {
      if (
        this.user.getPropertyNb(this.price[i].resource) < this.price[i].quantity
      ) {
        return false;
      }
    }
    return true;
  }
}
