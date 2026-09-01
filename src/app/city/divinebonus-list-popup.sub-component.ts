import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { IdToDivineBonusSubComponent } from './id-to-divinebonus.sub-component';
import { EwIconSubComponent } from '../../services/ew-icon.service';

import { TranslateDirective } from '@ngx-translate/core';

@Component({
  selector: 'app-divinebonus-list-popup',
  templateUrl: './divinebonus-list-popup.sub-component.html',
  styleUrls: ['./city.component.css'],
  imports: [
    EwIconSubComponent,
    IdToDivineBonusSubComponent,
    TranslateDirective,
  ],
})
export class DivineBonusListPopupSubComponent implements OnInit, OnDestroy {
  private readonly divineBonusListPopupSubComponentChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly socket = inject(Socket);

  @Input() divineBonus!: { error: number };

  public divineBonusList!: {
    bonus_id: number;
    nb: number;
  }[];

  Tools = Tools;

  ngOnInit() {
    this.socket.on('divineBonus', (data: { nb: number; list: object[] }) => {
      this.divineBonusListPopupSubComponentChangeDetectorRef.markForCheck();
      if (data.nb > 0) {
        this.divineBonusList = data.list as typeof this.divineBonusList;
      } else {
        this.divineBonusList = [];
      }
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('divineBonus');
  }

  divineBonusUse(bonus_id: number) {
    const msg = {
      bonus_id: bonus_id,
    };
    this.socket.emit('divineBonusUse', msg);
    this.divineBonus.error = 1;
  }
}
