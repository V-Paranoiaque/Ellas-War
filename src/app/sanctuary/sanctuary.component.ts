import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sanctuary',
  templateUrl: './sanctuary.component.html',
  imports: [TranslateModule],
})
export class SanctuaryComponent {
  translate = inject(TranslateService);
}
