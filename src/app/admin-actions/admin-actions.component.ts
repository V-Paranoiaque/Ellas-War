import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-admin-actions',
  templateUrl: './admin-actions.component.html',
  styleUrls: ['../admin/admin.component.css'],
})
export class AdminActionsComponent implements OnInit, OnDestroy {
  public adminActions: string;
  public adminAgora = {
    drachma: { quantity: 0, price: 0 },
    food: { quantity: 0, price: 0 },
    water: { quantity: 0, price: 0 },
    wood: { quantity: 0, price: 0 },
    iron: { quantity: 0, price: 0 },
    stone: { quantity: 0, price: 0 },
    marble: { quantity: 0, price: 0 },
    grapes: { quantity: 0, price: 0 },
    wine: { quantity: 0, price: 0 },
    gold: { quantity: 0, price: 0 },
  };
  public adminStoreroom = { ...this.adminAgora };

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.adminActions = '';
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.emit('adminAgoraAutoList');
    this.socket.emit('adminStoreroomAutoList');

    this.socket.on('adminAgoraAutoList', (list: object) => {
      for (const res in list) {
        this.adminAgora[res as keyof typeof this.adminAgora] =
          list[res as keyof typeof list];
      }
    });
    this.socket.on('adminStoreroomAutoList', (list: object) => {
      for (const res in list) {
        this.adminStoreroom[res as keyof typeof this.adminStoreroom] =
          list[res as keyof typeof list];
      }
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminAgoraAutoList');
    this.socket.removeListener('adminStoreroomAutoList');
  }

  run() {
    if (this.adminActions.length > 0) {
      this.socket.emit('adminActions', this.adminActions);
      this.adminActions = '';
    }
  }

  agoraSave() {
    this.socket.emit('adminAgoraAutoSave', this.adminAgora);
  }
  storeroomSave() {
    this.socket.emit('adminStoreroomAutoSave', this.adminStoreroom);
  }
}
