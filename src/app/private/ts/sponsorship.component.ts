import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import coinBagSolid from '@iconify-icons/clarity/coin-bag-solid';

@Component({
  templateUrl: '../html/sponsorship.component.html'
})

export class SponsorshipComponent implements OnInit, OnDestroy {
  public sponsorList:{
    membre_id:number, username:string, level:number,
    field:number, alliance:number, alliance_name:string,
    gift:number, remain:number, activity:number
  }[];
  public currentPlayer:{
    membre_id:number, username:string, level:number,
    field:number, alliance:number, alliance_name:string,
    gift:number, remain:number, activity:number
  };
  public giftsError = 0;
  public qttGiftsRess = '';

  private subTitle:Subscription;

  coinBagSolid  = coinBagSolid;

  constructor(private socket: Socket, private titleService: Title, 
              public translate: TranslateService) {
    this.sponsorList = [];
    this.currentPlayer = {
      membre_id: 0, username:'', level:0,
      field:0, alliance:0, alliance_name:'',
      gift:0, remain:0, activity:0
    }
    this.subTitle = new Subscription();
  }
  
  ngOnInit() {
    this.socket.emit('sponsorList');

    this.socket.on('sponsorList', (data:object[]) => {
      this.sponsorList = data as typeof this.sponsorList;
    });
    this.socket.on('sponsorGift', (data:number) => {
      this.giftsError = data;

      // Update the background list
      this.socket.emit('sponsorList');
    });
    this.socket.on('sponsorGiftRemain', (data:number) => {
      this.currentPlayer.remain = data;
    });

    this.subTitle = this.translate.get('Sponsorship').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('sponsorList');
    this.socket.removeListener('sponsorGift');
    this.socket.removeListener('sponsorGiftRemain');
    this.subTitle.unsubscribe();
  }

  selectPlayer(p:object) {
    this.qttGiftsRess = '';
    this.currentPlayer = p as typeof this.currentPlayer;
  }

  setGift() {
    this.qttGiftsRess = this.currentPlayer.remain.toString();
  }

  confirm() {
    this.giftsError = 0;
    let gift = {
      member: this.currentPlayer.membre_id,
      type: 1,
      qtt: this.qttGiftsRess
    };
    this.socket.emit('sponsorGift', gift);
    this.qttGiftsRess = '';
  }
}
