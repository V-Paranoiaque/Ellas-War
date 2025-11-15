import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

import coinBagSolid from '@iconify-icons/clarity/coin-bag-solid';

@Component({
  templateUrl: './sponsorship.component.html',
  imports: [
    CommonModule,
    FormsModule,
    IcIconComponent,
    MainLeftSubComponent,
    MainRightSubComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class SponsorshipComponent implements OnInit, OnDestroy {
  private readonly socket = inject(Socket);
  private readonly titleService = inject(Title);
  translate = inject(TranslateService);

  public sponsorList: {
    membre_id: number;
    username: string;
    level: number;
    field: number;
    alliance: number;
    alliance_name: string;
    gift: number;
    remain: number;
    activity: number;
  }[];
  public currentPlayer: {
    membre_id: number;
    username: string;
    level: number;
    field: number;
    alliance: number;
    alliance_name: string;
    gift: number;
    remain: number;
    activity: number;
  };
  public giftsError = 0;
  public qttGiftsRess = '';

  private subTitle: Subscription;

  coinBagSolid = coinBagSolid;

  constructor() {
    this.sponsorList = [];
    this.currentPlayer = {
      membre_id: 0,
      username: '',
      level: 0,
      field: 0,
      alliance: 0,
      alliance_name: '',
      gift: 0,
      remain: 0,
      activity: 0,
    };
    this.subTitle = new Subscription();
  }

  ngOnInit() {
    this.socket.emit('sponsorList');

    this.socket.on('sponsorList', (data: object[]) => {
      this.sponsorList = data as typeof this.sponsorList;
    });
    this.socket.on('sponsorGift', (data: number) => {
      this.giftsError = data;

      // Update the background list
      this.socket.emit('sponsorList');
    });
    this.socket.on('sponsorGiftRemain', (data: number) => {
      this.currentPlayer.remain = data;
    });

    this.subTitle = this.translate
      .get('Sponsorship')
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
  }

  ngOnDestroy() {
    this.socket.removeListener('sponsorList');
    this.socket.removeListener('sponsorGift');
    this.socket.removeListener('sponsorGiftRemain');
    this.subTitle.unsubscribe();
  }

  selectPlayer(p: object) {
    this.qttGiftsRess = '';
    this.currentPlayer = p as typeof this.currentPlayer;
  }

  setGift() {
    this.qttGiftsRess = this.currentPlayer.remain.toString();
  }

  confirm() {
    this.giftsError = 0;
    const gift = {
      member: this.currentPlayer.membre_id,
      type: 1,
      qtt: this.qttGiftsRess,
    };
    this.socket.emit('sponsorGift', gift);
    this.qttGiftsRess = '';
  }
}
