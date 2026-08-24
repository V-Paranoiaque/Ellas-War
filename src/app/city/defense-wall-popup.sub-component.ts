import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { IcIconComponent } from '../../services/ic-icon.service';

import { LocaleService } from '../../services/locale.service';

import shieldShaded from '@iconify/icons-bi/shield-shaded';

@Component({
  selector: 'app-defense-wall-popup',
  templateUrl: './defense-wall-popup.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, IcIconComponent, TranslateDirective, TranslatePipe],
})
export class DefenseWallPopupSubComponent implements OnInit, OnDestroy {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;

  public defenseWallStrength: number;

  Number = Number;

  shieldShaded = shieldShaded;

  constructor() {
    this.defenseWallStrength = 0;
  }

  ngOnInit() {
    this.socket.emit('defenseWallStrength');

    this.socket.on('defenseWallStrength', (data: number) => {
      this.defenseWallStrength = data;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('defenseWallStrength');
  }
}
