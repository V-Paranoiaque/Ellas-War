import { Component, inject } from '@angular/core';
import { UserComponent as User } from '../../services/user.service';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-agora-sell-help-popup',
  templateUrl: './agora-sell-help-popup.sub-component.html',
  styleUrls: ['./agora.component.css'],
  imports: [TranslateDirective, TranslatePipe],
})
export class AgoraSellHelpPopupSubComponent {
  user = inject(User);
}
