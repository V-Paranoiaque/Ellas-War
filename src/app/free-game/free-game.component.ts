import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserComponent as User } from '../../services/user.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../../environments/environment';

import discordIcon from '@iconify-icons/logos/discord-icon';
import facebookIcon from '@iconify-icons/logos/facebook';
import githubOctocat from '@iconify-icons/logos/github-octocat';

@Component({
  selector: 'app-free-game',
  templateUrl: './free-game.component.html',
})
export class FreeGameComponent implements OnInit, OnDestroy {
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
      .get('Visit Ancient Greece for free')
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
