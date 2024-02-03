import { Component } from '@angular/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-diplomacy-alliance-help-popup',
  templateUrl: './diplomacy-alliance-help-popup.sub-component.html',
})
export class DiplomacyAllianceHelpPopupSubComponent {
  constructor(public user: User) {}
}
