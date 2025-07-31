import { Component, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-diplomacy-alliance-create-popup',
  templateUrl: './diplomacy-alliance-create-popup.sub-component.html',
  imports: [FormsModule, TranslateModule],
})
export class DiplomacyAllianceCreatePopupSubComponent {
  private readonly socket = inject(Socket);

  public alliance!: {
    name: string;
    description: string;
  };

  constructor() {
    this.alliance = {
      name: '',
      description: '',
    };
  }

  allianceNew() {
    const msg = {
      name: this.alliance.name,
      description: this.alliance.description,
    };
    this.socket.emit('allianceNew', msg);
  }
}
