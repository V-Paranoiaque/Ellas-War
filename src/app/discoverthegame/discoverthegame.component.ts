import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import arrowLeft from '@iconify/icons-fa6-solid/arrow-left';
import arrowRight from '@iconify/icons-fa6-solid/arrow-right';

import { DiscoverthegameMenuSubComponent } from './discoverthegame-menu.sub-component';
import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  selector: 'app-discoverthegame',
  templateUrl: './discoverthegame.component.html',
  imports: [
    DiscoverthegameMenuSubComponent,
    IcIconComponent,
    MainLeftSubComponent,
    MainRightSubComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class DiscoverthegameComponent implements OnInit, OnDestroy {
  public page: string;

  private sub: Subscription;

  arrowLeft = arrowLeft;
  arrowRight = arrowRight;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    public translate: TranslateService
  ) {
    this.page = '';
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.page = params.get('page') ?? '';

      switch (this.page) {
        case '':
          this.sub = this.translate
            .get('Discover Ellas War and explore the Ancient Greece')
            .subscribe((res: string) => {
              this.titleService.setTitle(res);
            });
          break;

        case 'constructions':
          this.sub = this.translate
            .get('Construct buildings to make up your Greek city')
            .subscribe((res: string) => {
              this.titleService.setTitle(res);
            });
          break;

        case 'treasure':
          this.sub = this.translate
            .get('Hide your drachmas in your treasure')
            .subscribe((res: string) => {
              this.titleService.setTitle(res);
            });
          break;

        case 'temples':
          this.sub = this.translate
            .get('Build temples and enjoy the powers of the Gods')
            .subscribe((res: string) => {
              this.titleService.setTitle(res);
            });
          break;

        case 'recruitment':
          this.sub = this.translate
            .get('Recruit your army to defend your city from invaders')
            .subscribe((res: string) => {
              this.titleService.setTitle(res);
            });
          break;

        case 'army':
          this.sub = this.translate
            .get('Build a varied army and make your strategy')
            .subscribe((res: string) => {
              this.titleService.setTitle(res);
            });
          break;

        case 'attack':
          this.sub = this.translate
            .get('Develop your offensive strategy for attacking other cities')
            .subscribe((res: string) => {
              this.titleService.setTitle(res);
            });
          break;

        case 'defense':
          this.sub = this.translate
            .get('Defend your city with your army and your towers')
            .subscribe((res: string) => {
              this.titleService.setTitle(res);
            });
          break;

        case 'trade':
          this.sub = this.translate
            .get('Buy the resources you need')
            .subscribe((res: string) => {
              this.titleService.setTitle(res);
            });
          break;

        case 'sell':
          this.sub = this.translate
            .get('Sell resources you do not need')
            .subscribe((res: string) => {
              this.titleService.setTitle(res);
            });
          break;

        case 'games':
          this.sub = this.translate
            .get('The games')
            .subscribe((res: string) => {
              this.titleService.setTitle(res);
            });
          break;
        case 'treeofthegods':
          this.sub = this.translate
            .get('The tree of the gods')
            .subscribe((res: string) => {
              this.titleService.setTitle(res);
            });
          break;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
