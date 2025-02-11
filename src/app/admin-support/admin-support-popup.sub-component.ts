import { Component } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-support-popup',
  templateUrl: './admin-support-popup.sub-component.html',
  styleUrls: ['../admin/admin.component.css'],
  imports: [CommonModule, FormsModule, TranslateModule],
})
export class AdminSupportPopupSubComponent {
  msgPlayer = '';
  msgTitle = '';
  msgText = '';

  constructor(private readonly socket: Socket) {}

  send() {
    this.msgTitle = this.msgTitle.trim();
    this.msgText = this.msgText.trim();

    if (this.msgTitle.length > 0 && this.msgText.length > 0) {
      const msg = {
        id: this.msgPlayer,
        title: this.msgTitle.trim(),
        text: this.msgText.trim(),
      };
      this.socket.emit('adminSupportNew', msg);
      this.msgPlayer = '';
      this.msgTitle = '';
      this.msgText = '';
    }
  }
}
