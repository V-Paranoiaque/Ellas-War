import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserComponent as User } from 'src/services/user.service';

@Component({
  selector: 'app-main-menu-ranking',
  templateUrl: './main-menu-ranking.sub-component.html',
})
export class MainMenuRankingSubComponent {
  public localPage: string;
  constructor(
    private router: Router, public user: User) {
    this.localPage = this.router.url.split('/')[1];
  }
}
