import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sanctuary',
  templateUrl: './sanctuary.component.html',
})
export class SanctuaryComponent {
  constructor(public translate: TranslateService) {}
}
