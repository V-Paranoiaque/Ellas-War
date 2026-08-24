import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserComponent as User } from '../../services/user.service';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-menu-ranking',
  templateUrl: './main-menu-ranking.sub-component.html',
  imports: [CommonModule, RouterModule, TranslateDirective, TranslatePipe],
})
export class MainMenuRankingSubComponent {
  private readonly router = inject(Router);
  user = inject(User);

  public localPage: string;
  constructor() {
    this.localPage = this.router.url.split('/')[1];
  }
}
