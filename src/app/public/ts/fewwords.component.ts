import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import facebookIcon from '@iconify-icons/logos/facebook';
import githubOctocat from '@iconify-icons/logos/github-octocat';

@Component({
  templateUrl: '../html/fewwords.component.html'
})

export class FewWords {
  facebookIcon  = facebookIcon;
  githubOctocat = githubOctocat;
  
  constructor(private titleService: Title, public translate: TranslateService,
              public user: User) {
  }
  
  ngOnInit() {
    this.translate.get('A few words about Ellas War').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
}
