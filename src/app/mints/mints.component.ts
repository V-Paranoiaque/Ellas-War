import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  templateUrl: './mints.component.html',
  imports: [
    CommonModule,
    EwIconSubComponent,
    MainLeftSubComponent,
    MainRightSubComponent,
    TranslateModule,
  ],
})
export class MintsComponent implements OnInit, OnDestroy {
  public list: number[] = [];

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.socket.on('mintProduction', (result: number[]) => {
      this.list = result;
    });

    this.socket.emit('mintProduction');
  }

  ngOnDestroy() {
    this.socket.removeListener('mintProduction');
  }
}
