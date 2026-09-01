import { RouterModule } from '@angular/router';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UserComponent as User } from '../../services/user.service';
import { environment } from '../../environments/environment';
import { ToolsComponent as Tools } from '../../services/tools.service';

import { IcIconComponent } from '../../services/ic-icon.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

import discordIcon from '@iconify-icons/logos/discord-icon';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  imports: [
    IcIconComponent,
    MainLeftSubComponent,
    MainRightSubComponent,
    RouterModule,
    TranslateDirective,
  ],
})
export class HelpComponent implements OnInit, OnDestroy {
  private readonly helpComponentChangeDetectorRef = inject(ChangeDetectorRef);
  user = inject(User);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  translate = inject(TranslateService);

  private sub: Subscription;
  private subDesc: Subscription;

  discordIcon = discordIcon;
  environment = environment;

  constructor() {
    this.sub = new Subscription();
    this.subDesc = new Subscription();
  }

  ngOnInit() {
    this.sub = this.translate
      .get('Do you need help with Ellas War?')
      .subscribe((res: string) => {
        this.helpComponentChangeDetectorRef.markForCheck();
        this.titleService.setTitle(res);
      });
    this.subDesc = Tools.setDescription(
      this.translate,
      this.metaService,
      "Don't hesitate to contact us on Discord or Facebook. We will try to Answer you as soon as possible."
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subDesc.unsubscribe();
  }
}
