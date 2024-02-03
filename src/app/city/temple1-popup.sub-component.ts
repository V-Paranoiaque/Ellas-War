import { Component } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { TemplePopupSubComponent } from './temple-popup.sub-component';

@Component({
  selector: 'app-temple1-popup',
  templateUrl: './temple1-popup.sub-component.html',
})
export class Temple1PopupSubComponent extends TemplePopupSubComponent {
  constructor(
    protected override socket: Socket,
    public override user: User,
    public override translate: TranslateService
  ) {
    super(socket, user, translate);
    this.price = [
      { resource: 'drachma', quantity: 200000 },
      { resource: 'wood', quantity: 160000 },
      { resource: 'stone', quantity: 20000 },
      { resource: 'marble', quantity: 500 },
    ];
  }
  build() {
    this.socket.emit('buildTemple1', this.temple);
  }
}
