import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { environment } from './../../environments/environment';

import discordIcon from '@iconify-icons/logos/discord-icon';
import facebookIcon from '@iconify-icons/logos/facebook';
import githubOctocat from '@iconify-icons/logos/github-octocat';

@Component({
  selector: 'app-fewwords',
  templateUrl: './fewwords.component.html',
})
export class FewwordsComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  environment = environment;

  discordIcon = discordIcon;
  facebookIcon = facebookIcon;
  githubOctocat = githubOctocat;

  constructor(
    private titleService: Title,
    public translate: TranslateService,
    public user: User
  ) {
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.sub = this.translate
      .get('A few words about Ellas War')
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
