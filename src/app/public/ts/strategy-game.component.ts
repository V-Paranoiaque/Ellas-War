import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/strategy-game.component.html'
})

export class StrategyGame {

  constructor(private titleService: Title, public translate: TranslateService,
              public user: User) {
  }
  
  ngOnInit() {
    this.translate.get('Set up your strategy').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
}
