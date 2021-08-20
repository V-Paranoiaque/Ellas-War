import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import facebookIcon from '@iconify-icons/logos/facebook';
import githubOctocat from '@iconify-icons/logos/github-octocat';

@Component({
  templateUrl: '../html/community.component.html'
})

export class CommunityComponent implements OnInit, OnDestroy {
  private sub:any;
  
  facebookIcon  = facebookIcon;
  githubOctocat = githubOctocat;
  
  constructor(private titleService: Title, public translate: TranslateService,
              public user: User) {
  }
  
  ngOnInit() {
    this.sub = this.translate.get('Ellas War community').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
