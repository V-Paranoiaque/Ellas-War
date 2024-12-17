import { Component } from '@angular/core';
import { UserComponent as User } from '../../services/user.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-agora-sell-help-popup',
  templateUrl: './agora-sell-help-popup.sub-component.html',
  styleUrls: ['./agora.component.css'],
  imports: [TranslateModule],
})
export class AgoraSellHelpPopupSubComponent {
  constructor(public user: User) {}
}
