import { Component, inject} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sanctuary',
  templateUrl: './sanctuary.component.html',
})
export class SanctuaryComponent {
  translate = inject(TranslateService);
}
