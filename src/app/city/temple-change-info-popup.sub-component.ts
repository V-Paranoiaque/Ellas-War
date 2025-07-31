import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { EwIconSubComponent } from 'src/services/ew-icon.service';

@Component({
  selector: 'app-temple-change-info-popup',
  templateUrl: './temple-change-info-popup.sub-component.html',
  imports: [CommonModule, EwIconSubComponent, TranslateModule],
})
export class TempleChangeInfoPopupSubComponent implements OnInit, OnDestroy {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  public temple: number;
  public templeChangeError: number;
  public templeChangeHistory: {
    date: number;
    temple_old: number;
    temple_new: number;
  }[];

  constructor() {
    this.temple = 0;
    this.templeChangeError = 0;
    this.templeChangeHistory = [];
  }

  ngOnInit() {
    this.socket.on('templeChange', (data: number) => {
      this.templeChangeError = data;
      this.socket.emit('templeChangeHistory');
    });
    this.socket.on('templeChangeHistory', (data: object[]) => {
      this.templeChangeHistory = [];
      for (const i in data) {
        this.templeChangeHistory.push(
          data[i] as {
            date: number;
            temple_old: number;
            temple_new: number;
          }
        );
      }
    });

    this.socket.emit('templeChangeHistory');
  }

  ngOnDestroy() {
    this.socket.removeListener('templeChange');
    this.socket.removeListener('templeChangeHistory');
  }

  getPrice() {
    switch (this.temple) {
      case 1:
      case 2:
      case 3:
        return [
          { resource: 'drachma', quantity: 200000 },
          { resource: 'wood', quantity: 160000 },
          { resource: 'stone', quantity: 20000 },
          { resource: 'marble', quantity: 500 },
          { resource: 'favor', quantity: 1 },
        ];
      case 4:
      case 5:
        return [
          { resource: 'drachma', quantity: 500000 },
          { resource: 'wood', quantity: 400000 },
          { resource: 'stone', quantity: 50000 },
          { resource: 'marble', quantity: 1250 },
          { resource: 'favor', quantity: 2 },
        ];
      case 6:
      case 7:
      case 8:
        return [
          { resource: 'drachma', quantity: 1000000 },
          { resource: 'wood', quantity: 1200000 },
          { resource: 'stone', quantity: 400000 },
          { resource: 'marble', quantity: 8000 },
          { resource: 'favor', quantity: 3 },
        ];
      case 9:
      case 10:
      case 11:
        return [
          { resource: 'drachma', quantity: 4000000 },
          { resource: 'wood', quantity: 25000000 },
          { resource: 'stone', quantity: 1600000 },
          { resource: 'marble', quantity: 160000 },
          { resource: 'gold', quantity: 120000 },
          { resource: 'favor', quantity: 4 },
        ];
      default:
        return [];
    }
  }

  selectTemples(id: number) {
    this.temple = id;
    this.socket.emit('templeChangeError', id);
  }

  templeChange(templeNew: number) {
    const res = {
      old: this.temple,
      choice: templeNew,
    };
    this.socket.emit('templeChange', res);
  }
}
