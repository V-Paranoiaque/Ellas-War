import { Component } from '@angular/core';
import { UserComponent as User } from 'src/services/user.service';

@Component({
  selector: 'app-main-menu-ranking',
  templateUrl: './main-menu-ranking.sub-component.html',
})
export class MainMenuRankingSubComponent {
  constructor(public user: User) {}
}
