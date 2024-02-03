import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-main-private-favors-popup',
  templateUrl: './main-private-favors-popup.sub-component.html',
})
export class MainPrivateFavorsPopupSunComponent implements OnInit, OnDestroy {
  public favor: {
    id: number;
    error: number;
  };

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.favor = {
      id: 0,
      error: 0,
    };
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.on('favorUse', (id: number) => {
      this.favor.error = id;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('favorUse');
  }

  selectFavor(id: number) {
    this.favor = {
      id: id,
      error: 0,
    };
  }

  useFavor() {
    this.favor.error = 0;
    this.socket.emit('favorUse', this.favor.id);
  }
}
