import { Component } from '@angular/core';
import { User } from '../../../services/user.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

import facebookIcon from '@iconify-icons/logos/facebook';
import githubOctocat from '@iconify-icons/logos/github-octocat';

@Component({
  templateUrl: '../html/free-game.component.html'
})

export class FreeGame {
  facebookIcon  = facebookIcon;
  githubOctocat = githubOctocat;
  
  constructor(private titleService: Title, public translate: TranslateService,
              public user: User) {
  }
  
  ngOnInit() {
    this.translate.get('Visit Ancient Greece for free').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
}
