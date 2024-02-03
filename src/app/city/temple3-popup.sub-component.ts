import { Component } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { TemplePopupSubComponent } from './temple-popup.sub-component';

@Component({
  selector: 'app-temple3-popup',
  templateUrl: './temple3-popup.sub-component.html',
})
export class Temple3PopupSubComponent extends TemplePopupSubComponent {
  constructor(
    protected override socket: Socket,
    public override user: User,
    public override translate: TranslateService
  ) {
    super(socket, user, translate);
    this.price = [
      { resource: 'drachma', quantity: 1000000 },
      { resource: 'wood', quantity: 1200000 },
      { resource: 'stone', quantity: 400000 },
      { resource: 'marble', quantity: 8000 },
    ];
  }
  build() {
    this.socket.emit('buildTemple3', this.temple);
  }
}
