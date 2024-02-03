import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UserComponent as User } from '../../services/user.service';
import { environment } from '../../environments/environment';
import { ToolsComponent as Tools } from 'src/services/tools.service';

import discordIcon from '@iconify-icons/logos/discord-icon';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
})
export class HelpComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private subDesc: Subscription;

  discordIcon = discordIcon;
  environment = environment;

  constructor(
    public user: User,
    private titleService: Title,
    private metaService: Meta,
    public translate: TranslateService
  ) {
    this.sub = new Subscription();
    this.subDesc = new Subscription();
  }

  ngOnInit() {
    this.sub = this.translate
      .get('Do you need help with Ellas War?')
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
    this.subDesc = Tools.setDescription(
      this.translate,
      this.metaService,
      "Don't hesitate to contact us on Discord or Facebook. We will try to answer to you as soon as possible."
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subDesc.unsubscribe();
  }
}
