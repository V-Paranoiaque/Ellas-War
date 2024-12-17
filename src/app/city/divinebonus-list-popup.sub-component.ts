import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { IdToDivineBonusSubComponent } from './id-to-divinebonus.sub-component';
import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-divinebonus-list-popup',
  templateUrl: './divinebonus-list-popup.sub-component.html',
  styleUrls: ['./city.component.css'],
  imports: [
    CommonModule,
    EwIconSubComponent,
    IdToDivineBonusSubComponent,
    TranslateModule,
  ],
})
export class DivineBonusListPopupSubComponent implements OnInit, OnDestroy {
  @Input() divineBonus!: { error: number };

  public divineBonusList!: {
    bonus_id: number;
    nb: number;
  }[];

  Tools = Tools;

  constructor(private socket: Socket) {}

  ngOnInit() {
    this.socket.on('divineBonus', (data: { nb: number; list: object[] }) => {
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
