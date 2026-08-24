import { RouterModule } from '@angular/router';
import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

import { LocaleService } from '../../services/locale.service';
import { EwIconSubComponent } from '../../services/ew-icon.service';

@Component({
  selector: 'app-main-private-favors-popup',
  templateUrl: './main-private-favors-popup.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, EwIconSubComponent, RouterModule, TranslateDirective],
})
export class MainPrivateFavorsPopupSunComponent implements OnInit, OnDestroy {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;

  public favor: {
    id: number;
    error: number;
  };

  constructor() {
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
