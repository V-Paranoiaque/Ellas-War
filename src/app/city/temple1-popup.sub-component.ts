import { Component, inject} from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { TemplePopupSubComponent } from './temple-popup.sub-component';
import { FormsModule } from '@angular/forms';
import { EwIconSubComponent } from '../../services/ew-icon.service';
import { CommonModule } from '@angular/common';

import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-temple1-popup',
  templateUrl: './temple1-popup.sub-component.html',
  imports: [
    CommonModule,
    EwIconSubComponent,
    FormsModule,
    TranslateDirective,
    TranslatePipe,
  ],
})
export class Temple1PopupSubComponent extends TemplePopupSubComponent {
  protected override socket: Socket;
  override user: User;
  override translate: TranslateService;
  readonly currentLocale = inject(LocaleService).currentLocale;

  constructor() {
    const socket = inject(Socket);
    const user = inject(User);
    const translate = inject(TranslateService);

    super();
    this.socket = socket;
    this.user = user;
    this.translate = translate;

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
