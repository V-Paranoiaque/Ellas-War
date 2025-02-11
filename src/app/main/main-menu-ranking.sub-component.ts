import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserComponent as User } from 'src/services/user.service';
import { TranslateModule } from '@ngx-translate/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-menu-ranking',
  templateUrl: './main-menu-ranking.sub-component.html',
  imports: [CommonModule, RouterModule, TranslateModule],
})
export class MainMenuRankingSubComponent {
  public localPage: string;
  constructor(
    private readonly router: Router,
    public user: User
  ) {
    this.localPage = this.router.url.split('/')[1];
  }
}
