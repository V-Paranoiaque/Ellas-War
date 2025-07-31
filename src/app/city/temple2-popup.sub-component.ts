import { Component, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { TemplePopupSubComponent } from './temple-popup.sub-component';
import { FormsModule } from '@angular/forms';
import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-temple2-popup',
  templateUrl: './temple2-popup.sub-component.html',
  imports: [CommonModule, EwIconSubComponent, FormsModule, TranslateModule],
})
export class Temple2PopupSubComponent extends TemplePopupSubComponent {
  protected override socket: Socket;
  override user: User;
  override translate: TranslateService;

  constructor() {
    const socket = inject(Socket);
    const user = inject(User);
    const translate = inject(TranslateService);

    super();
    this.socket = socket;
    this.user = user;
    this.translate = translate;

    this.price = [
      { resource: 'drachma', quantity: 500000 },
      { resource: 'wood', quantity: 400000 },
      { resource: 'stone', quantity: 50000 },
      { resource: 'marble', quantity: 1250 },
    ];
  }
  build() {
    this.socket.emit('buildTemple2', this.temple);
  }
}
