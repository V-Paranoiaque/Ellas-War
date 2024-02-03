import { Component } from '@angular/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-agora-sell-help-popup',
  templateUrl: './agora-sell-help-popup.sub-component.html',
  styleUrls: ['./agora.component.css'],
})
export class AgoraSellHelpPopupSubComponent {
  constructor(public user: User) {}
}
