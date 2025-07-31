import { Component, OnInit, OnDestroy, inject } from '@angular/core';
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
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  public list: number[] = [];

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
