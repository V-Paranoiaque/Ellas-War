import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

import arrowLeft from '@iconify/icons-fa-solid/arrow-left';
import arrowRight from '@iconify/icons-fa-solid/arrow-right';

@Component({
  templateUrl: '../html/discoverthegame.component.html',
  styleUrls: ['../css/discoverthegame.component.css']
})

export class DiscoverTheGame {
  
  public page:string;
  
  arrowLeft = arrowLeft;
  arrowRight= arrowRight;
  
  constructor(private route: ActivatedRoute, private router: Router,
              private titleService: Title, public translate: TranslateService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.page = '';
  }
  
  ngOnInit() {
    let page = this.route.snapshot.paramMap.get('page');
    if(page) {
      this.page = page;
    }
    
    switch(this.page) {
      case '':
        this.translate.get('Discover Ellas War and explore the Ancient Greece').subscribe((res: string) => {
          this.titleService.setTitle(res);
        });
      break;
      
      case 'constructions':
        this.translate.get('Construct buildings to make up your Greek city').subscribe((res: string) => {
          this.titleService.setTitle(res);
        });
      break;
      
      case 'treasure':
        this.translate.get('Hide your drachmas in your treasure').subscribe((res: string) => {
          this.titleService.setTitle(res);
        });
      break;
      
      case 'temples':
        this.translate.get('Build temples and enjoy the powers of the Gods').subscribe((res: string) => {
          this.titleService.setTitle(res);
        });
      break;
      
      case 'recruitment':
        this.translate.get('Recruit your army to defend your city from invaders').subscribe((res: string) => {
          this.titleService.setTitle(res);
        });
      break;
      
      case 'army':
        this.translate.get('Build a varied army and make your strategy').subscribe((res: string) => {
          this.titleService.setTitle(res);
        });
      break;
      
      case 'attack':
        this.translate.get('Build your offensive strategy to attack other cities').subscribe((res: string) => {
          this.titleService.setTitle(res);
        });
      break;
      
      case 'defense':
        this.translate.get('Defend your city with your army and your towers').subscribe((res: string) => {
          this.titleService.setTitle(res);
        });
      break;
      
      case 'trade':
        this.translate.get('Buy the resources you need').subscribe((res: string) => {
          this.titleService.setTitle(res);
        });
      break;
      
      case 'sell':
        this.translate.get('Sell resources you do not need').subscribe((res: string) => {
          this.titleService.setTitle(res);
        });
      break;
    }

  }
}
