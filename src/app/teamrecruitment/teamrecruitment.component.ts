import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UserComponent as User } from '../../services/user.service';
import { environment } from './../../environments/environment';
import { ToolsComponent as Tools } from 'src/services/tools.service';

import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

import discordIcon from '@iconify-icons/logos/discord-icon';
import facebookIcon from '@iconify-icons/logos/facebook';
import githubOctocat from '@iconify-icons/logos/github-octocat';

@Component({
  selector: 'app-teamrecruitment',
  templateUrl: './teamrecruitment.component.html',
  imports: [
    MainLeftSubComponent,
    MainRightSubComponent,
    IcIconComponent,
    TranslateModule,
  ],
})
export class TeamrecruitmentComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private subDesc: Subscription;

  environment = environment;

  discordIcon = discordIcon;
  facebookIcon = facebookIcon;
  githubOctocat = githubOctocat;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    public translate: TranslateService,
    public user: User
  ) {
    this.sub = new Subscription();
    this.subDesc = new Subscription();
  }

  ngOnInit() {
    this.sub = this.translate
      .get('Ellas War Staff recruitment')
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
    this.subDesc = Tools.setDescription(
      this.translate,
      this.metaService,
      'Join the Ellas War team and participate in the evolution of the game. We accept all goodwill.'
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subDesc.unsubscribe();
  }
}
