import { Component } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { TemplePopupSubComponent } from './temple-popup.sub-component';
import { FormsModule } from '@angular/forms';
import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-temple4-popup',
  templateUrl: './temple4-popup.sub-component.html',
  imports: [CommonModule, EwIconSubComponent, FormsModule, TranslateModule],
})
export class Temple4PopupSubComponent extends TemplePopupSubComponent {
  constructor(
    protected override socket: Socket,
    public override user: User,
    public override translate: TranslateService
  ) {
    super(socket, user, translate);
    this.price = [
      { resource: 'drachma', quantity: 4000000 },
      { resource: 'wood', quantity: 25000000 },
      { resource: 'stone', quantity: 1600000 },
      { resource: 'marble', quantity: 160000 },
      { resource: 'gold', quantity: 120000 },
    ];
  }
  build() {
    this.socket.emit('buildTemple4', this.temple);
  }
}
