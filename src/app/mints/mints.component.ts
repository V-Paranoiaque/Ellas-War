import {
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

import { LocaleService } from '../../services/locale.service';
import { EwIconSubComponent } from '../../services/ew-icon.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  templateUrl: './mints.component.html',
  imports: [
    CommonModule,
    EwIconSubComponent,
    MainLeftSubComponent,
    MainRightSubComponent,
    TranslateDirective,
  ],
})
export class MintsComponent implements OnInit, OnDestroy {
  private readonly mintsComponentChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;

  public list: number[] = [];

  ngOnInit() {
    this.socket.on('mintProduction', (result: number[]) => {
      this.mintsComponentChangeDetectorRef.markForCheck();
      this.list = result;
    });

    this.socket.emit('mintProduction');
  }

  ngOnDestroy() {
    this.socket.removeListener('mintProduction');
  }
}
