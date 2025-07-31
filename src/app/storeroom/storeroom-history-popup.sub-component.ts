import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-storeroom-history-popup',
  templateUrl: './storeroom-history-popup.sub-component.html',
  imports: [CommonModule, EwIconSubComponent, TranslateModule],
})
export class StoreroomHistoryPopupSubComponent implements OnInit, OnDestroy {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  public list: {
    day: number;
    quantity: number;
    price: number;
    resource: number;
  }[] = [];

  Tools = Tools;

  ngOnInit() {
    this.socket.on('storeroomHistory', (data: object[]) => {
      this.list = data.slice().reverse() as typeof this.list;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('storeroomHistory');
  }
}
